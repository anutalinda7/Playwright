import { test } from "@playwright/test"
import { describe } from "node:test"
import data from "../testData/testData"
import { LoginPage } from "../pageObject/loginPage"
import { CartFunctionality } from "../pageObject/cartFunctionalityPage"


describe("Product Browsing and Selection", async () => {
  let testCaseNr = 1;

  test(`TC ${testCaseNr++}: Verify Adding Products to Cart`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const cartFunctionality = new CartFunctionality(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await cartFunctionality.addBackpackAndBikeToCart(data.remove);
    await cartFunctionality.goToCart();
    await cartFunctionality.verifyProductDetails();
    await cartFunctionality.verifyDetailInformationAboutAddProducts(
      data.orderOfProducts[0], 
      data.orderOfProducts[1],
      data.productsPrice[0],
      data.productsPrice[1]
      );
  }
  );

  test(`TC ${testCaseNr++}: Verify Product Details in Cart`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const cartFunctionality = new CartFunctionality(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd);
    await cartFunctionality.addBackpackAndBikeToCart(data.remove);
    await cartFunctionality.goToCart();
    await cartFunctionality.verifyProductsListLength(2);
    await cartFunctionality.verifyProductQuantityInCart(1);
  }
  );

  test(`TC ${testCaseNr++}: Verify Removing Products from Cart`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const cartFunctionality = new CartFunctionality(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await cartFunctionality.addBackpackAndBikeToCart(data.remove);
    await cartFunctionality.goToCart();
    await cartFunctionality.removeBackpackFromCart();
    await cartFunctionality.verifyProductsListLength(1);
    await cartFunctionality.removeBikeFromCart();
    await cartFunctionality.verifyEmptyCartList();
  }
  );
 
  test(`TC ${testCaseNr++}: Verify Cart Count Badge`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const cartFunctionality = new CartFunctionality(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await cartFunctionality.addBackpackToCart(data.remove);
    await cartFunctionality.goToCart();
    await cartFunctionality.verifyBadgeQuantity(1);
    await cartFunctionality.clickMenuBtn();
    await cartFunctionality.clickAllItemsSidebar();
    await cartFunctionality.addBikeToCart(data.remove);
    await cartFunctionality.goToCart();
    await cartFunctionality.verifyBadgeQuantity(1);
    await cartFunctionality.removeBackpackFromCart();
    await cartFunctionality.verifyBadgeQuantity(1);
    await cartFunctionality.removeBikeFromCart();
    await cartFunctionality.verifyEmptyCartBadge();
  }
  );

  test(`TC ${testCaseNr++}: Verify Checkout Process`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const cartFunctionality = new CartFunctionality(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await cartFunctionality.addBackpackToCart(data.remove);
    await cartFunctionality.goToCart();
    await cartFunctionality.goToFirstCheckoutPage();
    await cartFunctionality.verifyContainsVisibility(data.titleYourInformation);
  }
  );

  test(`TC ${testCaseNr++}: Verify Returning to the List of Products from Cart`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const cartFunctionality = new CartFunctionality(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await cartFunctionality.goToCart();
    await cartFunctionality.goBackToContinueShopping();
  }
  );
})