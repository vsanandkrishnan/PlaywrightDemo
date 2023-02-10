const { test, expect } = require("@playwright/test");

test.only("Browser Context Playwright test", async ({ browser }) => {
  //Playwright code- Chrome plugins/cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  console.log(title);

  //Locators
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");
  const cardTitles = page.locator("div.card-body a");

  await userName.type("rahulshetty");
  await password.type("learning");
  await signInButton.click();

  //wait for the error message
  const errorMessage = await page.locator("div[style*='block']").textContent();
  console.log(errorMessage);

  //assertion
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  //clearing the existing username and password
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("learning");
  await signInButton.click();

  await Promise.all([page.waitForNavigation(), signInButton.click()]);

  //to get the title after logging in
  // console.log(await cardTitles.nth(0).textContent());
  // console.log(await cardTitles.first().textContent());

  //wait for all the service calls to be completed
  //await page.waitForLoadState("networkidle");
  //await cardTitles.waitFor();
  //To Get all the content titles
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page Playwright test", async ({ page }) => {
  //Playwright code
  await page.goto("https://www.google.com/");
  const title = await page.title();
  await expect(page).toHaveTitle("Google");
});
