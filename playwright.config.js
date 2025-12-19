// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// 🔥 Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 90000,
  fullyParallel: false,
  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'https://community.cloud.automationanywhere.digital',
    headless: false,                 // Needed for UI (TaskBot & FormBot)
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
