const { expect } = require('@playwright/test');

class TaskBotPage {
  constructor(page) {
    this.page = page;

    // Create bot
    this.botNameInput = page.getByLabel('Name');
    this.createButton = page.getByRole('button', { name: 'Create' });

    // Actions panel
    this.actionsSearchInput = page.getByPlaceholder('Search actions');
    this.messageBoxAction = page
      .getByRole('button', { name: /^Message box$/ })
      .last();

    // Save
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async createTaskBot(name) {
    await expect(this.botNameInput).toBeVisible();
    await this.botNameInput.fill(name);
    await this.createButton.click();
  }

  async addMessageBox() {
  await this.actionsSearchInput.fill('Message Box');

  await expect(this.messageBoxAction).toBeVisible({ timeout: 20000 });
  await this.messageBoxAction.dblclick();

}


  // ✅ THIS METHOD WAS MISSING / NOT LOADED
 async fillMessageBoxDetails() {
  const textboxes = this.page.getByRole('textbox');

  const windowTitleInput = textboxes.nth(1);
  const messageInput = textboxes.nth(2);

  await expect(windowTitleInput).toBeVisible({ timeout: 20000 });
  await expect(messageInput).toBeVisible({ timeout: 20000 });

  await windowTitleInput.fill(
    'Automation Anywhere Enterprise Client'
  );

  await messageInput.fill(
    'Hello from Playwright Automation'
  );

  // ✅ Correct assertion for custom textbox
  await expect(messageInput).toContainText(
    /Playwright Automation/
  );
}




  async saveBot() {
    await expect(this.saveButton).toBeEnabled({ timeout: 20000 });
    await this.saveButton.click();
  }
}

module.exports = { TaskBotPage };
