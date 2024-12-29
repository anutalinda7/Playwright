import { test } from "@playwright/test"
import { describe } from "node:test"
import data from "../testData/testData"
import { LoginPage } from "../pageObject/loginPage"

const loginData = [
  { usr: data.lockedOutUsr, pwd: data.validPwd, err: data.msgRequiredLockedUsr },
  { usr: data.invalidUsr, pwd: data.validPwd, err: data.msgWrongLoginData },
  { usr: data.validUsr, pwd: data.invalidPwd, err: data.msgWrongLoginData },
  { usr: data.invalidUsr, pwd: data.invalidPwd, err: data.msgWrongLoginData },
  { usr: undefined, pwd: data.validPwd, err: data.msgRequiredUsr },
  { usr: data.validUsr, pwd: undefined, err: data.msgRequiredPwd },
  { usr: undefined, pwd: undefined, err: data.msgRequiredUsr }
];


describe("Product purchase", async () => {
  let testCaseNr = 1;

  test(`TC ${testCaseNr++}: Successful Login`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    await page.goto(data.loginPageUrl);   
    await loginPage.login(data.validUsr, data.validPwd)
    await loginPage.verifyContainsVisibility(data.labelProducts);
  }
  );

  loginData.forEach(({ usr, pwd, err })=>{
    test(`TC ${testCaseNr++}: Login with Locked Out User, Invalid User, or Empty Information and Check the Message`, async ({ page }) => {
      const loginPage = new LoginPage(page);  
      await page.goto(data.loginPageUrl); 
      await loginPage.login(usr, pwd)
      await loginPage.verifyErrorMsg(err);
    }
    );
  });

  test(`TC ${testCaseNr++}: Verify Correct Logout`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    await page.goto(data.loginPageUrl)
    await loginPage.login(data.validUsr, data.validPwd);   
    await loginPage.clickMenuBtn();
    await loginPage.logoutAndVerify();
  }
  );

  test(`TC ${testCaseNr++}: Check the Disabled Error Message Using the Delete Icon`, async ({ page }) => {
    const loginPage = new LoginPage(page); 
    await page.goto(data.loginPageUrl)
    await loginPage.login(data.invalidUsr, data.validPwd);   
    await loginPage.verifyErrorMsg(data.msgWrongLoginData);
    await loginPage.deleteAndVerifyErrMsg();
  }
  );

})