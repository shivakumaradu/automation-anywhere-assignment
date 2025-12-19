const { test } = require('@playwright/test');
const path = require('path');

const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AutomationPage } = require('../pages/AutomationPage');
const { FormDesignerPage } = require('../pages/FormDesignerPage');
const { FormPreviewPage } = require('../pages/FormPreviewPage');

test('Use Case 2: Form with Upload Flow (UI Automation)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const automationPage = new AutomationPage(page);
  const designer = new FormDesignerPage(page);
  const preview = new FormPreviewPage(page);

  // Ensure this file exists in your project directory
  const filePath = path.resolve(__dirname, '../test-data/sample1.pdf');

  // 1. Login
  await loginPage.navigate();
  await loginPage.login(process.env.AA_USERNAME, process.env.AA_PASSWORD);

  // 2. Navigate
  await dashboardPage.clickAutomationMenu();
  await automationPage.clickCreateAndSelectForm();

  // 3. Design Form
  const uniqueFormName = `Form_${Date.now()}`;
  await designer.createForm(uniqueFormName);
  await designer.addTextbox();
  await designer.addSelectFile();

  // 4. Preview (Runtime)

  

  // 6. Save
  
  await designer.saveForm();
});