class Thankyou {
  constructor(page) {
    this.page = page;
    this.primaryText = page.locator(".hero-primary");
    this.orderIdText = page.locator(".em-spacer-1 label.ng-star-inserted");
    this.cartButton = page.locator("button[routerlink*='orders']");
  }

  async checkPrimaryText(text) {
    const thankYouText = await this.primaryText.textContent();
    return thankYouText.includes(text);
  }

  async getOrderId() {
    return await this.orderIdText.textContent();
  }

  async clickOnCartButton() {
    await this.cartButton.click();
  }
}

module.exports = { Thankyou };
