import { test } from "@playwright/test"
import { describe } from "node:test"
import data from "../testData/testData"
import { LoginPage } from "../pageObject/loginPage"
import { ProductBrowsing } from "../pageObject/productBrowsingPage"


describe("Product Browsing and Selection", async () => {
  let testCaseNr = 1;

  const sortingChoice = [
     'az','za', 'hilo', 'lohi'
  ];

  test(`TC ${testCaseNr++}: Verify the Number of Products Listed and Compare with the Expected Count`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productBrowsing = new ProductBrowsing(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await  productBrowsing.verifyProductDetails();
  }
  );

  test(`TC ${testCaseNr++}: Verify Product List`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productBrowsing = new ProductBrowsing(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await  productBrowsing.verifyProductsInfBrowsingPage();
  }
  );

  test(`TC ${testCaseNr++}: Ensure the Products are Correctly Categorized`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productBrowsing = new ProductBrowsing(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await  productBrowsing.verifyProductsOrder(data.orderOfProducts);
  }
  );

  sortingChoice.forEach((i) => {
    test(`TC ${testCaseNr++}: Validate Sorting Functionality with ${i}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productBrowsing = new ProductBrowsing(page);
      
      await page.goto(data.loginPageUrl);
      await loginPage.login(data.validUsr, data.validPwd);
      await productBrowsing.verifySortingOrder(i);
    });
  })
 
  test(`TC ${testCaseNr++}: Check Product Details`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productBrowsing = new ProductBrowsing(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await  productBrowsing.goToProductDetailsPage(0);
    await  productBrowsing.verifyProductDetails();
    await  productBrowsing.verifyProductsListLength(1);
    await  productBrowsing.addProductToCartAndVerify(data.remove, data.cartPageUrl);
  }
  );

  test(`TC ${testCaseNr++}: Test Navigation`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    const productBrowsing = new ProductBrowsing(page);
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await  productBrowsing.clickMenuBtn();
    await  productBrowsing.clickAllItemsSidebar();
    await  productBrowsing.verifyProductDetails();
    await  productBrowsing.verifyProductsListLength(6);
  }
  );
})