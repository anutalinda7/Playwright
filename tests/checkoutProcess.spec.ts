import { test, expect } from "@playwright/test"
import { describe } from "node:test"
import data from "../testData/testData"
import { LoginPage } from "../pageObject/loginPage"
import { CheckoutProcess } from "../pageObject/checkoutPage"

const itemsPrice = [
  parseFloat(data.productsPrice[0]),
  parseFloat(data.productsPrice[1])
];
const taxRate = data.rate;
const totalItemPrice = itemsPrice.reduce((price, item) => (price + item), 0);
const expectedTax = taxRate * totalItemPrice;
const totalPrice = expectedTax + totalItemPrice;

const incompleteInfoTests = [
  { fn: undefined, ln: data.ln, zc: data.zc, err: data.fnErrCheckoutPage },
  { fn: data.fn, ln: undefined, zc: data.zc, err: data.lnErrCheckoutPage },
  { fn: data.fn, ln: data.ln, zc: undefined, err: data.zcErrCheckoutPage },
  { fn: undefined, ln: undefined, zc: data.zc, err: data.fnErrCheckoutPage },
  { fn: undefined, ln: data.ln, zc: undefined, err: data.fnErrCheckoutPage },
  { fn: data.fn, ln: undefined, zc: undefined, err: data.lnErrCheckoutPage },
  { fn: undefined, ln: undefined, zc: undefined, err: data.fnErrCheckoutPage }
];

describe("Checkout Process", async () => {
  let testCaseNr = 1;

  test(`TC ${testCaseNr++}: Verify Complete the Checkout Process and Place an Order`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const checkoutProcess = new CheckoutProcess(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await checkoutProcess.addBackpackAndBikeToCart(data.remove);
    await checkoutProcess.goToCart();
    await checkoutProcess.goToFirstCheckoutPage();
    await checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
    await checkoutProcess.clickContinueBtnCheckoutPage();
    await checkoutProcess.verifyProductDetails();
    await checkoutProcess.goToFinishCheckoutPage();
    await checkoutProcess.verifyContainsVisibility(data.msgThankYouForOrder);
  }
  );

  test(`TC ${testCaseNr++}: Verify Price Calculation and Tax`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const checkoutProcess = new CheckoutProcess(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await checkoutProcess.addBackpackAndBikeToCart(data.remove);
    await checkoutProcess.goToCart();
    await checkoutProcess.goToFirstCheckoutPage();
    await checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
    await checkoutProcess.clickContinueBtnCheckoutPage();
    await checkoutProcess.verifyDetailInformationAboutAddProducts(
      data.orderOfProducts[0],
      data.orderOfProducts[1],
      data.productsPrice[0],
      data.productsPrice[1]
    );
    await expect(await checkoutProcess.getElement(checkoutProcess.itemsTotalPrice)).toHaveText(`Item total: $${totalItemPrice.toFixed(2)}`);
    await expect(await checkoutProcess.getElement(checkoutProcess.tax)).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
    await expect(await checkoutProcess.getElement(checkoutProcess.totalPriceWithTax)).toHaveText(`Total: $${totalPrice.toFixed(2)}`);
    await checkoutProcess.goToFinishCheckoutPage();
  })

  incompleteInfoTests.forEach(({ fn, ln, zc, err }) => {
    test(`TC ${testCaseNr++}: Checkout with incomplete Information`, async ({ page }) => {
      const loginPage = new LoginPage(page); 
      const checkoutProcess = new CheckoutProcess(page);
      await page.goto(data.loginPageUrl);   
      await loginPage.login(data.validUsr, data.validPwd);
      await checkoutProcess.addBackpackToCart(data.remove);
      await checkoutProcess.goToCart();
      await checkoutProcess.goToFirstCheckoutPage();
      await checkoutProcess.fillYourInformationAndCheckError(fn, ln, zc, err);
  })
})

test(`TC ${testCaseNr++}: Cancel Checkout from the Checkout: Your Information Page`, async ({ page }) => {
  const loginPage = new LoginPage(page); 
  const checkoutProcess = new CheckoutProcess(page);
  await page.goto(data.loginPageUrl);   
  await loginPage.login(data.validUsr, data.validPwd)
  await checkoutProcess.addBackpackToCart(data.remove);
  await checkoutProcess.goToCart();
  await checkoutProcess.goToFirstCheckoutPage();
  await checkoutProcess.clickCancelCheckoutBtn();
  await expect(page.url()).toContain('/cart.html');
});

test(`TC ${testCaseNr++}: Cancel Checkout from the Checkout: Overview Page`, async ({ page }) => {
  const loginPage = new LoginPage(page); 
  const checkoutProcess = new CheckoutProcess(page);
  await page.goto(data.loginPageUrl);   
  await loginPage.login(data.validUsr, data.validPwd)
  await checkoutProcess.addBackpackToCart(data.remove);
  await checkoutProcess.goToCart();
  await checkoutProcess.goToFirstCheckoutPage();
  await checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
  await checkoutProcess.clickContinueBtnCheckoutPage();
  await checkoutProcess.clickCancelCheckoutBtn();
  await expect(page.url()).toContain('/inventory.html')
});

test(`TC ${testCaseNr++}: Go Back Home After Order`, async ({ page }) => {
  const loginPage = new LoginPage(page); 
  const checkoutProcess = new CheckoutProcess(page);
  await page.goto(data.loginPageUrl);   
  await loginPage.login(data.validUsr, data.validPwd)
  await checkoutProcess.addBackpackToCart(data.remove);
  await checkoutProcess.goToCart();
  await checkoutProcess.goToFirstCheckoutPage();
  await checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
  await checkoutProcess.clickContinueBtnCheckoutPage();
  await checkoutProcess.goToFinishCheckoutPage();
  await checkoutProcess.goBackToHomePage();
});
})