import { expect } from "@playwright/test";
import { ProductBrowsing } from "./productBrowsingPage";
import data from "../testData/testData"

export class CartFunctionality extends ProductBrowsing {
  private readonly quantityCartBadge = '[data-test=shopping-cart-badge]';
  private readonly checkoutBtn = '[data-test=checkout]';
  private readonly continueShopingBtn = '[data-test=continue-shopping]';

  async addBackpackToCart(txt: string): Promise<void> {
    await (await this.getElement(this.addToCartBackpackProduct)).click();
    await expect(await this.getElement(this.removeBackpackProduct)).toHaveText(txt);
  };
  
  async addBikeToCart(txt: string): Promise<void> {
    await (await this.getElement(this.addToCartBikeProduct)).click();
    await expect(await this.getElement(this.removeBikeProduct)).toHaveText(txt);
  };
  
  async addBackpackAndBikeToCart(txt: string): Promise<void> {
    await this.addBackpackToCart(txt);
    await this.page.waitForTimeout(2000); 
    await this.addBikeToCart(txt);
    await this.page.waitForTimeout(2000); 
  };
  
  async removeBackpackFromCart(): Promise<void> {
    await (await this.getElement(this.removeBackpackProduct)).click();
  };
  
  async removeBikeFromCart(): Promise<void> {
    await (await this.getElement(this.removeBikeProduct)).click();
  };
  
  async goToCart(): Promise<void> {
    await (await this.getElement(this.goToCartBtn)).click();
    await expect(this.page.url()).toContain(data.cartPageUrl);
  };
  
  async verifyProductQuantityInCart(nr: number): Promise<void> {
    const items = await this.getElement(this.itemQuantity);
    const count = await items.count();

    for (let i = 0; i < count; i++){
      await expect(await items.nth(i)).toHaveCount(nr);
    }
  };
  
  async verifyEmptyCartList(): Promise<void> {
    await expect(await this.getElement(this.listItem)).not.toBeVisible;
  };
  
  async verifyEmptyCartBadge(): Promise<void> {
    await expect(await this.getElement(this.quantityCartBadge)).not.toBeVisible;;
  };
  
  async verifyBadgeQuantity(text: number): Promise<void> {
    await expect(await this.getElement(this.quantityCartBadge)).toHaveCount(text);
  };
  
  async goBackToContinueShopping() : Promise<void>{
    await (await this.getElement(this.continueShopingBtn)).click();
    await expect(this.page.url()).toContain(data.inventoryPageUrl);
  };

  async verifyDetailInformationAboutAddProducts(firstProductName: string, secondProductName: string, firstProductPrice: string, secondProductPrice: string): Promise<void> {
    await expect(await this.getElement(`text=${firstProductName}`)).toBeVisible();
    await expect(await this.getElement(`text=${secondProductName}`)).toBeVisible();
    await expect(await this.page.locator(this.productDetailsPrice).first()).toHaveText(`$${firstProductPrice}`);
    await expect(await this.page.locator(this.productDetailsPrice).last()).toHaveText(`$${secondProductPrice}`);
  };

  async goToFirstCheckoutPage(): Promise<void> {
    await (await this.getElement(this.checkoutBtn)).click();
    await expect(this.page.url()).toContain(data.checkoutStepOnePageUrl);
  };
}