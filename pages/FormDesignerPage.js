const { expect } = require('@playwright/test');

class FormDesignerPage {
  constructor(page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');

    // Dialog (outside iframe)
    this.formNameInput = page.getByRole('textbox', { name: 'Name' });
    this.createAndEditButton = page.getByRole('button', { name: /create & edit/i });

    // Palette (inside iframe)
    this.textboxPalette = this.frame.getByRole('button', { name: /text box/i });
    this.selectFilePalette = this.frame.getByRole('button', { name: /select file/i });

    // Toolbar & Containers
    this.previewButton = this.frame.getByRole('button', { name: /preview/i });
    this.saveButton = this.frame.getByRole('button', { name: /^save$/i });
    this.sidebar = this.frame.locator('button', { hasText: 'Elements' }).locator('..').locator('..');
    this.propertiesPane = this.frame.getByRole('tab', { name: /properties/i }).locator('..').locator('..');
    this.toolbar = this.previewButton.locator('..');
    // Designer → Properties → Form name
this.designerFormNameInput = this.frame.getByRole('textbox', {
  name: /form name|form title/i
});

    // Canvas items
    this.canvasTextboxItem = this.frame.getByText('TextBox', { exact: true }).locator('..');
    this.canvasSelectFileItem = this.frame
  .locator('div') // Or the specific canvas container if known
  .filter({ hasText: /^Select a file$/ }) // Exact match for the canvas label text
  .first();
  }

  async createForm(formName) {
    await expect(this.formNameInput).toBeVisible({ timeout: 10000 });
    await this.formNameInput.fill(formName);
    await this.createAndEditButton.click();
  }

  async waitForDesignerReady() {
    await expect(this.frame.locator('body')).toBeVisible({ timeout: 20000 });
    await expect(this.textboxPalette).toBeVisible({ timeout: 20000 });
  }

async getCanvasCenter(yOffset = 0) {
  const sidebarBox = await this.sidebar.boundingBox();
  const propsBox = await this.propertiesPane.boundingBox();
  const toolbarBox = await this.toolbar.boundingBox();

  if (!sidebarBox || !propsBox || !toolbarBox) {
    throw new Error('Canvas bounds not found');
  }

  return {
    x: sidebarBox.x + sidebarBox.width + (propsBox.x - (sidebarBox.x + sidebarBox.width)) / 2,
    y: toolbarBox.y + toolbarBox.height + 150 + yOffset // Add offset here
  };
}

// Update dragToCanvas to handle the offset
async dragToCanvas(source, yOffset = 0) {
  await expect(source).toBeVisible({ timeout: 20000 });

  const sourceBox = await source.boundingBox();
  const { x, y } = await this.getCanvasCenter(yOffset);

  await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  await this.page.mouse.down();
  await this.page.mouse.move(x, y, { steps: 25 });
  await this.page.mouse.up();
}

// Add elements with vertical spacing
async addTextbox() {
  await this.waitForDesignerReady();
  await this.dragToCanvas(this.textboxPalette, 0); // First item at top
  await expect(this.canvasTextboxItem).toBeVisible({ timeout: 10000 });
}

async addSelectFile() {
  // 1. Drag and drop the element
  await this.dragToCanvas(this.selectFilePalette, 100); 

  // 2. Locate the format input box in the Properties Pane
  // The snapshot shows this textbox is used to define extensions
  const formatInput = this.frame.getByRole('textbox', { 
    name: /Enter file formats/i 
  });

  // 3. FIX: Fill extensions so 'browse' becomes a clickable link in Preview
  await formatInput.fill('pdf, png, jpg, txt');

  // 4. Verify the element is successfully added to the canvas
  await expect(this.canvasSelectFileItem).toBeVisible({ timeout: 10000 });
}
  async openPreview() {
    await this.previewButton.click();
  }
  
  async setDesignerFormName(name) {
  await expect(this.designerFormNameInput).toBeVisible({ timeout: 10000 });
  await this.designerFormNameInput.fill(name);
}

  async saveForm() {
  await expect(this.saveButton).toBeEnabled({ timeout: 10000 });

  await this.saveButton.click();
  await this.page.waitForTimeout(5000);

  // ✅ WAIT FOR SAVE COMPLETION SIGNAL
  await expect(
    this.frame.getByText(/Powered by Automation Anywhere/i)
  ).toBeVisible({ timeout: 15000 });
}


}

module.exports = { FormDesignerPage };