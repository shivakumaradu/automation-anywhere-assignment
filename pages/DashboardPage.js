const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;

    // Left sidebar Automation menu (unique & stable)
    this.automationMenu = page.getByRole('link', {
      name: 'Automation',
      exact: true
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.automationMenu).toBeVisible({ timeout: 20000 });
  }

  async clickAutomationMenu() {
    await this.automationMenu.click();
  }
}

module.exports = { DashboardPage };
