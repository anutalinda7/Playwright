import { Locator, expect } from "@playwright/test";
import { Timeout } from "../utils/enums";
import { BasePage } from "./basePage";
import data from "../testData/testData"

export class LoginPage extends BasePage {
    private readonly usrLoginPage = '[data-test=username]';
    private readonly pwdLoginPage = '[data-test=password]';
    private readonly loginBtn = '[data-test=login-button]';
    private readonly errorMsg = '[data-test="error"]';
    private readonly deleteErrorMsgIcon = '[data-test=error-button]';
    private readonly menuBtn = '#react-burger-menu-btn';
    private readonly logoutSidebar = '[data-test=logout-sidebar-link]';

    async verifyErrorVisibility(): Promise<void> {
        const element = await this.getElement(this.errorMsg);
        await expect(element).toBeVisible();
    }
    
    async typeUsername(usr: string): Promise<void>{
        const usernameInput = await this.getElement('[data-test="username"]');
        await usernameInput.fill(usr);
    }

    async typePassword(pwd: string): Promise<void> {
        const element = await this.getElement(this.pwdLoginPage);
        await element.fill(pwd);
    }

    async verifyPwdMasking(): Promise<void> {
        const element = this.getElement(this.pwdLoginPage);
        const typeAttr = (await element).getAttribute('type');
        expect(typeAttr).toBe('password');
    }
  
    async login(usr?: string, pwd?: string): Promise<void> {
        if (usr !== undefined) await this.typeUsername(usr);
        if (pwd !== undefined) await this.typePassword(pwd);
        const element = await this.getElement(this.loginBtn);
        await element.click();

    }

    async visitSauceDemoInventoryPage (usr: string, pwd: string, url:string) {
        this.login(usr, pwd);
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(url)
    }

    async verifyErrorMsg(text: string): Promise<void> {
        const element = await this.getElement(this.errorMsg);
        await expect(element).toContainText(text);
        await expect(element).not.toContainText('SQL');
        await expect(element).not.toContainText('syntax');
        await expect(element).not.toContainText('database');
        await expect(element).not.toContainText('query');
        await expect(element).not.toContainText('table');
        await expect(element).not.toContainText('column');
        await expect(element).not.toContainText('SELECT');
        await expect(element).not.toContainText('INSERT');
        await expect(element).not.toContainText('UPDATE');
        await expect(element).not.toContainText('DELETE');
        await expect(element).not.toContainText('FROM');
        await expect(element).not.toContainText('WHERE');
    }

    async deleteAndVerifyErrMsg(): Promise<void> {
        const icon = await this.getElement(this.deleteErrorMsgIcon);
        await icon.click();
        const element = await this.getElement(this.errorMsg);
        await expect(element).not.toBeVisible();
    }

    async clickMenuBtn() {
        const element = await this.getElement(this.menuBtn);
        await element.click();
      };
      
    async logoutAndVerify(): Promise<void> {
        const element = await this.getElement(this.logoutSidebar);
        await element.click();
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(data.loginPageUrl)
        const label = await this.page.locator(`text=${data.labelProducts}`);
        await expect(label).not.toBeVisible();
        const loginButton = await this.getElement(this.loginBtn);
        await expect(loginButton).not.toBeDisabled();
      };
}