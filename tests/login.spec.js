const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AutomationPage } = require('../pages/AutomationPage');
const { TaskBotPage } = require('../pages/TaskBotPage');

test('Use Case 1: Create Task Bot – Message Box Task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const automationPage = new AutomationPage(page);
  const taskBotPage = new TaskBotPage(page);

  // Step 1: Login
  await loginPage.navigate();
  await loginPage.verifyLoginPageUI();
  await loginPage.login(
    process.env.AA_USERNAME,
    process.env.AA_PASSWORD
  );

  // Step 2: Dashboard → Automation
  await dashboardPage.verifyDashboardLoaded();
  await dashboardPage.clickAutomationMenu();

  // Step 3: Create → Task Bot
  await automationPage.verifyAutomationPageUI();
  await automationPage.clickCreateAndSelectTaskBot();

  // Step 4: Create bot
  await taskBotPage.createTaskBot('Mess');

  await taskBotPage.addMessageBox();

  await taskBotPage.fillMessageBoxDetails();

  await taskBotPage.saveBot();
});
