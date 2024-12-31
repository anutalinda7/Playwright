import { test, expect } from "@playwright/test"
import { describe } from "node:test"
import data from "../testData/testData"
import { LoginPage } from "../pageObject/loginPage"

const urls = [
    'https://www.saucedemo.com/inventory.html',
    'https://www.saucedemo.com/inventory-item.html?id=4',
    'https://www.saucedemo.com/cart.html',
    'https://www.saucedemo.com/checkout-step-one.html',
    'https://www.saucedemo.com/checkout-step-two.html',
    'https://www.saucedemo.com/checkout-complete.html'
  ];

describe("Security", async () => {
    let testCaseNr = 1;

    test(`TC ${testCaseNr++}: Verify Password Masking`, async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await page.goto(data.loginPageUrl);   
        await loginPage.typePassword(data.validPwd);
        await loginPage.verifyPwdMasking();
    }
    );

    test(`TC ${testCaseNr++}: Verify Absence SQL Injection in Login`, async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await page.goto(data.loginPageUrl);   
        await loginPage.login('\' OR 1=1 --', data.validPwd);  
        await loginPage.verifyErrorVisibility();
        await loginPage.verifyErrorMsg(data.msgWrongLoginData);
    })

    test(`TC ${testCaseNr++}: Verify Prevention of XSS Injection in Login`, async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await page.goto(data.loginPageUrl); 
        await loginPage.login(`<script>alert("XSS")</script>`, data.validPwd);
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).not.toBe('XSS');
            await dialog.dismiss();
        });
        await expect(page.locator('text = XSS')).not.toBeVisible();
        await loginPage.verifyErrorVisibility();
    });

    test(`TC ${testCaseNr++}: Verify HTTPS in Login url`, async ({ page }) => {
        const loginPage = new LoginPage(page); 
        await page.goto(data.loginPageUrl);   
        const protocol = new URL(page.url()).protocol;
        expect(protocol).toBe('https:');

    });

    urls.forEach((eachUrl) => {
        test(`TC ${testCaseNr++}: Verify HTTPS for URL ${eachUrl}`, async ({ page }) => {
            await page.goto(eachUrl);   
            const protocol = new URL(page.url()).protocol;
            expect(protocol).toBe('https:');
        });
    })

    urls.forEach((eachUrl) => {
        test(`TC ${testCaseNr++}: All Critical Pages Display an Access Denied Message when Bypassing Login for the URL ${eachUrl}`, async ({ page }) => {
            const loginPage = new LoginPage(page); 
            await page.goto(eachUrl);   
            await loginPage.verifyErrorVisibility();
        });
    })

    urls.forEach((eachUrl) => {
        test(`TC ${testCaseNr++}: Check for a 404 Error for Invalid URL ${eachUrl}`, async ({ page }) => {
            const response = await page.request.get(eachUrl, { failOnStatusCode: false });
            expect(response.status()).toBe(404);
        });
    })
})