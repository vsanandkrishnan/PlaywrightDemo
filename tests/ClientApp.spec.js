const { test, expect } = require("@playwright/test");

test.only("Client Application Playwright Test", async ({ page }) => {
  //Playwright code- Chrome plugins/cookies

  await page.goto("https://rahulshettyacademy.com/client");
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signInButton = page.locator("#login");
  const cardTitle = page.locator(".card-body b");

  await userName.fill("anshika@gmail.com");
  await password.fill("Iamking@000");
  await signInButton.click();
  await page.waitForLoadState("networkidle");
  const titles = await cardTitle.allTextContents();
  console.log(titles);
});
