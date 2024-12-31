import { Locator, Page, expect } from "@playwright/test"

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getElement(selector:string): Promise<Locator> {
        return this.page.locator(selector)
    }

    async verifyContainsVisibility(contains: string): Promise<void>{
        const locator = this.page.locator(`text=${contains}`);
        await expect(locator).toBeVisible();
    }
}