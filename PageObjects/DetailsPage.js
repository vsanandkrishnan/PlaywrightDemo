class DetailsPage {
  constructor(page) {
    this.page = page;
    this.autoSuggestDropdown = page.locator("[placeholder*='Country']");
    this.dropDownDetails = page.locator(".ta-results");
    this.placeOrderButton = page.locator("a:has-text('Place Order')");
    this.emailTextBox = page.locator(".user__name input[type='text']");
    this.orderDetailsId = page.locator(".col-text");
  }

  async enterCountryDetails(text) {
    await this.autoSuggestDropdown.type(text, { delay: 100 });
    await this.dropDownDetails.waitFor();
  }

  async selectCountryFromDropDown(countryName) {
    const dropDownButtons = this.dropDownDetails.locator("button");
    const dropDownButtonCount = await dropDownButtons.count();
    //console.log(dropDownButtonCount);

    for (let i = 0; i < dropDownButtonCount; i++) {
      let text = await dropDownButtons.nth(i).textContent();
      //console.log(text);
      if (text.trim() === countryName) {
        await dropDownButtons.nth(i).click();
        break;
      }
    }
  }

  async checkMailId(mailId) {
    const userName = await this.emailTextBox.innerText();
    return userName.includes(mailId);
  }

  async clickOnPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  async getOrderDetailsId() {
    return await this.orderDetailsId.textContent();
  }
}

module.exports = { DetailsPage };
