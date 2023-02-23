const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
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

test("@web UI Controls", async ({ page }) => {
  //Playwright code
  page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //Locators
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");

  //Static dropdown Buttons
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  //Radio Buttons
  const radioButtons = page.locator(".form-check-inline input");
  await radioButtons.nth(1).click();

  //Pop alert click
  await page.locator("#okayBtn").click();

  //assertions for radio buttons
  await expect(radioButtons.nth(1)).toBeChecked();
  const isChecked = radioButtons.nth(1).isChecked();
  console.log(isChecked);

  //Click Checkboxes
  const checkBox = page.locator("#terms");
  await checkBox.click();

  //assertions for checkbox
  await expect(checkBox).toBeChecked();

  //Uncheck checkbox
  await checkBox.uncheck();
  expect(await checkBox.isChecked()).toBeFalsy();

  //Blinking link and check the attribute
  const documentLink = page.locator("a[href*='document']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  //await page.pause();
});

test("@web Child Windows Handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //blinking link
  const documentLink = page.locator("a[href*='document']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  //New Page locator
  const textLink = newPage.locator(".red");
  const text = await textLink.textContent();
  console.log(text);
  const emailId = text.split("@")[1].split(" ")[0];
  console.log(emailId);

  const userName = page.locator("#username");
  await userName.fill(emailId);

  //await page.pause();
});
