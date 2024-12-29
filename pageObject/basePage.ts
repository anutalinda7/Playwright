import { Locator, Page, expect } from "@playwright/test"
import { Button, Timeout } from "../utils/enums"

export class BasePage {
    protected page: Page;
    private readonly radioBtn = ".radio_btn";
    protected readonly checkbox = "[type='checkbox']"

    constructor(page: Page) {
        this.page = page;
    }

    async getElement(selector:string): Promise<Locator> {
        return this.page.locator(selector)
    }

    async verifyContainsVisibility(contains: string){
        const locator = this.page.locator(`text=${contains}`);
        await expect(locator).toBeVisible();
    }
}