const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataOrder: {
    emailId: "anshika@gmail.com",
    password: "Iamking@000",
    text: "Thankyou for the order.",
    productName: "iphone 13 pro",
  },
});
