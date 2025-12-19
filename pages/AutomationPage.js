const { expect } = require('@playwright/test');

class AutomationPage {
  constructor(page) {
    this.page = page;

    this.createButton = page.getByRole('button', {
      name: 'Create',
      exact: true
    });

    this.taskBotOption = page.getByText('Task Bot…', { exact: true });

    this.formOption = page.getByText('Form…', { exact: true });
  }

  async verifyAutomationPageUI() {
    await expect(this.createButton).toBeVisible({ timeout: 20000 });
  }

  async clickCreateAndSelectTaskBot() {
    await this.createButton.click();
    await this.taskBotOption.waitFor({ state: 'visible', timeout: 20000 });
    await this.taskBotOption.click();
  }

  async clickCreateAndSelectForm() {
    await this.createButton.click();
    await this.formOption.waitFor({ state: 'visible', timeout: 20000 });
    await this.formOption.click();
  }
}

module.exports = { AutomationPage };
