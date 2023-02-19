//text browser -> json,cart-order. orderdetails, orderhistory

const { test, expect } = require("@playwright/test");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const emailId = "anshika@gmail.com";
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signInButton = page.locator("#login");

  await page.goto("https://rahulshettyacademy.com/client");
  await userName.fill(emailId);
  await password.fill("Iamking@000");
  await signInButton.click();
  await page.waitForLoadState("networkidle");

  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Client Application Playwright Test", async () => {
  //Playwright code- Chrome plugins/cookies
  const productName = "iphone 13 pro";
  const emailId = "anshika@gmail.com";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  const products = page.locator(".card-body");
  const addToCartBtn = page.locator("button[routerlink*='cart']");
  const cartSection = page.locator("div li");
  //const cardTitle = page.locator(".card-body b");

  //   await page.goto("https://rahulshettyacademy.com/client");
  //   await userName.fill(emailId);
  //   await password.fill("Iamking@000");
  //   await signInButton.click();
  //   await page.waitForLoadState("networkidle");
  //const titles = await cardTitle.allTextContents();

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

  await addToCartBtn.click();
  await cartSection.first().waitFor();
  const val = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(val).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const dropDownButtons = dropdown.locator("button");
  const dropDownButtonCount = await dropDownButtons.count();
  //console.log(dropDownButtonCount);

  for (let i = 0; i < dropDownButtonCount; i++) {
    let text = await dropDownButtons.nth(i).textContent();
    //console.log(text);
    if (text.trim() === "India") {
      await dropDownButtons.nth(i).click();
      break;
    }
  }
  console.log(await page.locator(".user__name input[type='text']").innerText());
  await expect(page.locator(".user__name label[type='text']")).toHaveText(
    emailId
  );

  await page.locator("a:has-text('Place Order')").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    "Thankyou for the order."
  );

  const orderId = await page
    .locator(".em-spacer-1 label.ng-star-inserted")
    .textContent();

  console.log(orderId);

  await page.locator("button[routerlink*='orders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      console.log("Entered the Loop");
      await rows.nth(i).locator("button:has-text('View')").first().click();
      break;
    }
  }

  const orderIdFromDetailsPage = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdFromDetailsPage)).toBeTruthy();
  // console.log(titles);
  // await page.pause();
});
