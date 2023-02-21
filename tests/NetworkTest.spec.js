const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../Utils/APIUtils.js");
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

const fakePayloadResponse = { data: [], message: "No Orders" };

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

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = fakePayloadResponse;
      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.locator("button[routerlink*='orders']").click();
  //await page.pause();
  //await page.locator("tbody").waitFor();
  console.log(await page.locator(".mt-4").textContent());
});
