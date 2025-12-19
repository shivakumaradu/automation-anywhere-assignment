import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests/api',
  timeout: 60000,
  reporter: 'html',

  globalSetup: require.resolve('./global-setup.js'),

  use: {
    baseURL: 'https://community.cloud.automationanywhere.digital'
  }
});
