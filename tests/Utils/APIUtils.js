class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload }
    );
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    return token;
  }

  async createOrder(createOrderPayload) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createOrderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}

export { APIUtils };
