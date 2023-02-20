const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./Utils/APIUtils.js");
const loginPayload = {
  userEmail: "anandvs@gmail.com",
  userPassword: "Anand@007",
};

//const fakePayloadResponse = { data: [], message: "No Orders" };

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
  await page.locator("button[routerlink*='orders']").click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63f30674568c3e9fb11ae777",
    async (route) =>
      await route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63f30026568c3e9fb11ae142",
      })
  );

  await page.locator("button:has-text('View')").first().click();
  //await page.pause();
  //await page.pause();
  //await page.locator("tbody").waitFor();

  await expect(
    await page.locator("div.email-wrapper p").textContent()
  ).toContain("You are not authorize to view this order");
});
