import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,//30 seconds
  expect: {
    timeout: 10 * 1000,
  },
  reporter: 'html',
  projects: [{
    name: 'chromium',
    use: { ...devices['Desktop Chrome']}
  }]
});