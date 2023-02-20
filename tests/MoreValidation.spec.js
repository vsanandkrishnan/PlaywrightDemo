const { test, expect } = require("@playwright/test");

test("Pop Up Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://www.google.co.in/");

  //   await page.goBack();
  //   await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  //await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator(".text h2").textContent();
  const subscribers = textCheck.split(" ")[1];
  console.log(subscribers);

  expect(subscribers).toEqual("13,522");
});

//Screenshot description

test("Screenshot & Visual comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();

  await page
    .locator("#displayed-text")
    .screenshot({ path: "PartialScreenShot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

//Visual Comparison
test.only("Visual", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.locator("#hero div input[type='search']").waitFor();
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
