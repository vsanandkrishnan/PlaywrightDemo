const { test, expect } = require("@playwright/test");
const { POManager } = require("../PageObjects/POManager");

test("Client Application Playwright Test", async ({ page }) => {
  //Playwright code- Chrome plugins/cookies
  const productName = "iphone 13 pro";
  const emailId = "anshika@gmail.com";
  const pass = "Iamking@000";
  const cartSection = page.locator("div li");
  const text = "Thankyou for the order.";

  //POManager
  const poManager = new POManager(page);

  //Login Page
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(emailId, pass);

  //Dashboard Page
  const dashboardPage = poManager.getDashboarPage();
  await dashboardPage.searchProduct(productName);
  await dashboardPage.navigateToCart();

  //Checkout Page
  await cartSection.first().waitFor();
  const val = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(val).toBeTruthy();
  await page.locator("text=Checkout").click();

  //Details Page
  const detailsPage = poManager.getDetailsPage();
  await detailsPage.enterCountryDetails("ind");
  await detailsPage.selectCountryFromDropDown("India");
  await expect(detailsPage.checkMailId(emailId)).toBeTruthy();
  await detailsPage.clickOnPlaceOrderButton();

  //Thank you page
  const thankyou = poManager.getThankYouPage();
  await expect(await thankyou.checkPrimaryText(text)).toBeTruthy();
  const orderId = await thankyou.getOrderId();
  console.log(orderId);
  await thankyou.clickOnCartButton();

  //Cart Page
  const cart = poManager.getCart();
  await cart.clickOnViewDetailsPage(orderId);

  const orderIdFromDetailsPage = await detailsPage.getOrderDetailsId();
  expect(orderId.includes(orderIdFromDetailsPage)).toBeTruthy();
});
