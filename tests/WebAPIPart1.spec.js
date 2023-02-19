const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./Utils/APIUtils.js");
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

const createOrderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};

let token;
let orderId;
let response;
// let apiContext;

test.beforeAll(async () => {
  //Login Api
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(createOrderPayload);
});

test.beforeEach(() => {});

test("Client Application Playwright Test", async ({ page }) => {
  //Playwright code- Chrome plugins/cookies
  token = response.token;
  orderId = response.orderId;

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState("networkidle");
  //await page.pause();
  await page.locator("button[routerlink*='orders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (rowOrderId.includes(orderId)) {
      console.log("Entered the Loop");
      await rows.nth(i).locator("button:has-text('View')").first().click();
      break;
    }
  }

  const orderIdFromDetailsPage = await page.locator(".col-text").textContent();
  expect(orderIdFromDetailsPage.includes(orderId)).toBeTruthy();
  // console.log(titles);
  // await page.pause();
});
