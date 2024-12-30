import { expect } from "@playwright/test";
import { LoginPage } from "./loginPage";

export class ProductBrowsing extends LoginPage{
    private readonly allItemsSidebar = '[data-test=inventory-sidebar-link]';
    protected readonly productsSection = '[data-test=inventory-container]';
    protected readonly listItem = '[data-test=inventory-item]';
    private readonly productItem = '.inventory_item';
    protected readonly itemQuantity = '[data-test=item-quantity]';
    private readonly sortContainer = '[data-test=product-sort-container]';
    selectAZ = 'az';
    selectZA = 'za';
    selectHiLo = 'hilo';
    selectLoHi = 'lohi';
    private readonly itemName = '.inventory_item_name';
    private readonly itemPrice = '.inventory_item_price';
    protected readonly itemImg = '.inventory_item_img';
    private readonly productDetailsName = '[data-test=inventory-item-name]';
    protected readonly productDetailsPrice = '[data-test=inventory-item-price]';
    private readonly productDetailsDesc = '[data-test=inventory-item-desc]';
    private readonly productDetailsImg = '.inventory_details_img';
    private readonly addToCartBtnFromDetails = '[data-test=add-to-cart]';
    private readonly removeBtnFromDetails = '[data-test=remove]';
    protected readonly addToCartBackpackProduct = '[data-test=add-to-cart-sauce-labs-backpack]';
    protected readonly addToCartBikeProduct = '[data-test=add-to-cart-sauce-labs-bike-light]';
    protected readonly removeBackpackProduct = '[data-test=remove-sauce-labs-backpack]';
    protected readonly removeBikeProduct = '[data-test=remove-sauce-labs-bike-light]';
    protected readonly goToCartBtn = '[data-test=shopping-cart-link]';

    async verifyProductsListLength (expectedLength: number): Promise<void> {
        const element = await this.getElement(this.listItem);
        await expect(element).toHaveCount(expectedLength)
      };
      
      async verifyProductsInfBrowsingPage() {
        const products = await this.getElement(this.productItem);
        const count = await products.count();

        for( let i = 0; i < count; i++){
            const product = products.nth(i);
            await expect(product.locator(this.itemName)).toBeVisible();
            await expect(product.locator(this.itemPrice)).toBeVisible();
        }
      }
      
    async verifyProductsOrder (expectOrder: string[]) {
        const elements = await this.getElement(this.productItem);
        for (let i = 0; i < expectOrder.length; i++) {
            const name = await elements.nth(i).locator(this.itemName).textContent();
            expect(name).toBe(expectOrder[i])
        }
      }; 
      
    async goToProductDetailsPage (index: number) {
        const element = await this.getElement(this.itemName);
        await element.nth(index).click();
    };
      
    async verifyProductDetails () {
        const products = await this.getElement(this.productDetailsName)
        const count = await products.count();

        for(let i = 0; i < count; i++) {
            await expect(products.nth(i)).toBeVisible();
            await expect( (await this.getElement(this.productDetailsPrice)).nth(i)).toBeVisible();
            await expect((await this.getElement(this.productDetailsDesc)).nth(i)).toBeVisible()
        } 
      };
      
    async addProductToCartAndVerify (text: string, url: string) {
        await expect( await this.getElement(this.productDetailsImg)).toBeVisible();
        await (await this.getElement(this.addToCartBtnFromDetails)).click();
        await expect(await this.getElement(this.removeBtnFromDetails)).toHaveText(text);
        await (await this.getElement(this.goToCartBtn)).click();
        await expect(this.page).toHaveURL(new RegExp(url));
        this.verifyProductDetails();
      };
      
    async selectSortOption (option: string) {
        await (await this.getElement(this.sortContainer)).selectOption(option);
      };
      
      async verifySortingOrder(option: string) {
        await this.selectSortOption(option);
        if (option === this.selectAZ || option === this.selectZA) {
          const reverse = option === this.selectZA;
          const items = await this.page.locator(this.itemName).allTextContents();
          const sortedItems = [...items].sort();
          if (reverse) sortedItems.reverse();
          expect(items).toEqual(sortedItems);
        } else if (option === this.selectHiLo || option === this.selectLoHi) {
          const highToLow = option === this.selectLoHi;
          const items = await this.page.locator(this.itemPrice).allTextContents();
          const prices = items.map(item => parseFloat(item.replace('$', '')));
          const sortedPrices = [...prices].sort((a, b) => (highToLow ? a - b : b - a));
          expect(prices).toEqual(sortedPrices);
        }
      }

    async clickAllItemsSidebar () {
          await (await this.getElement(this.allItemsSidebar)).click();
      };
}