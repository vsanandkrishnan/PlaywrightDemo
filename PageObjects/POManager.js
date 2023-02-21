const { LoginPage } = require("./LoginPage");
const { DetailsPage } = require("./DetailsPage");
const { DashboardPage } = require("./DashboardPage");
const { Thankyou } = require("./Thankyou");
const { Cart } = require("./Cart");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.detailsPage = new DetailsPage(this.page);
    this.thankyou = new Thankyou(page);
    this.cart = new Cart(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboarPage() {
    return this.dashboardPage;
  }

  getDetailsPage() {
    return this.detailsPage;
  }

  getThankYouPage() {
    return this.thankyou;
  }

  getCart() {
    return this.cart;
  }
}

module.exports = { POManager };
