// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "my-allure-results",
        suiteTitle: false,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    // browserName: "firefox",
    //actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: "on-first-retry",
    headless: true,
    screenshot: "on",
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        headless: false,
        browserName: "chromium",
        screenshot: "on",
        trace: "retain-on-failure",
      },
    },
    {
      name: "firefox",
      use: {
        headless: false,
        browserName: "firefox",
        screenshot: "on",
        trace: "retain-on-failure",
        video: "retain-on-failure",
      },
    },
    {
      name: "safari",
      use: {
        headless: false,
        browserName: "webkit",
        screenshot: "on",
        trace: "on",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        ...devices["iPhone 11"],
      },
    },
    //{
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { channel: "msedge" },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
