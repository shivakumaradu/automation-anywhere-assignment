const { chromium } = require('@playwright/test');
const fs = require('fs');

module.exports = async (config) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let capturedToken = null;

  try {
    console.log('--- Starting Network Intercept Setup ---');

    // Intercept headers from the background API calls
    page.on('request', request => {
      const headers = request.headers();
      if (headers['x-authorization'] && headers['x-authorization'].startsWith('ey')) {
        capturedToken = headers['x-authorization'];
      }
    });

    await page.goto('https://community.cloud.automationanywhere.digital');

    // Perform Login
    await page.fill('input[name="username"]', process.env.AA_USERNAME);
    await page.fill('input[name="password"]', process.env.AA_PASSWORD);
    await page.click('button:has-text("Log in")');

    // Wait for landing page
    await page.waitForURL('**/#/home', { timeout: 60000 });
    
    // Retry loop to ensure the token is captured from background traffic
    for (let i = 0; i < 15; i++) {
        if (capturedToken) break;
        await page.waitForTimeout(1000);
    }

    if (!capturedToken) throw new Error("Token not intercepted!");

    // Save auth state and token
    await context.storageState({ path: 'auth.json' });
    const authData = JSON.parse(fs.readFileSync('auth.json', 'utf-8'));
    authData.capturedToken = capturedToken;
    fs.writeFileSync('auth.json', JSON.stringify(authData, null, 2));

    console.log('Setup complete: Token saved.');
  } finally {
    await browser.close();
  }
};