const { test, expect } = require("@playwright/test");
const { customtest } = require("../Utils/test-base");
const { POManager } = require("../PageObjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../test-data/PlaceOrderTestData.json"))
);

customtest(
  "Client Application Playwright Test",
  async ({ page, testDataOrder }) => {
    //Playwright code- Chrome plugins/cookies
    const productName = testDataOrder.productName;
    const emailId = testDataOrder.emailId;
    const password = testDataOrder.password;
    const text = testDataOrder.text;

    //POManager
    const poManager = new POManager(page);

    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(emailId, password);

    //Dashboard Page
    const dashboardPage = poManager.getDashboarPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    //Checkout Page
    const cartSection = page.locator("div li");
    await cartSection.first().waitFor();
    let local = `h3:has-text('${productName}')`;
    const val = await page.locator(local).isVisible();
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
  }
);
