class Cart {
  constructor(page) {
    this.page = page;
    this.tableBody = page.locator("tbody");
    this.tableRow = page.locator("tbody tr");
  }

  async clickOnViewDetailsPage(orderId) {
    await this.tableBody.waitFor();

    const rows = this.tableRow;

    for (let i = 0; i < (await rows.count()); i++) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        console.log("Entered the Loop");
        await rows.nth(i).locator("button:has-text('View')").first().click();
        break;
      }
    }
  }
}

module.exports = { Cart };
