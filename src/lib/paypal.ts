import paypal from "@paypal/checkout-server-sdk"

const environment = new paypal.core.SandboxEnvironment(
    "AWavsGHCmDGduWX_0KUVv2GSQXSBUcAg-RUhPYq9LpoSmvZXYR7kaG0Oi-Eqet2u2EeQXJQcctiWWk4V",
    "EIApZk4hn54crOm-E972uo4RD8puTtGmE8DL1nVsl2letYS1SVMGaKU6xepLJsk1vG3H3wGSrTsdFuIQ"
);


const client = new paypal.core.PayPalHttpClient(environment);

export default client;