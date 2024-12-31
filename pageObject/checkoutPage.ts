import { expect } from "@playwright/test";
import { CartFunctionality } from "./cartFunctionalityPage";
import data from "../testData/testData"

export class CheckoutProcess extends CartFunctionality {
  private readonly firstNameCheckoutPage = '[data-test=firstName]';
  private readonly lastNameCheckoutPage = '[data-test=lastName]';
  private readonly zipCodeCheckoutPage = '[data-test=postalCode]';
  private readonly cancelBtnCheckoutPage = '[data-test=cancel]';
  private readonly continueBtnCheckoutPage = '[data-test=continue]';
  itemsTotalPrice = '[data-test=subtotal-label]';
  tax = '[data-test=tax-label]';
  totalPriceWithTax = '[data-test=total-label]';
  private readonly finishBtnCheckoutPage = '[data-test="finish"]';
  private readonly goBackHomeBtn = '[data-test=back-to-products]';

    async checkErrorText(text: string): Promise<void> {
      await expect(await this.getElement(this.errorMsg)).toHaveText(text);
    };
    
   async fillYourInformation (fn:string | undefined, ln:string | undefined, zc:string | undefined): Promise<void> {
      if (fn !== undefined) await (await this.getElement(this.firstNameCheckoutPage)).fill(fn);
      if (ln !== undefined) await (await this.getElement(this.lastNameCheckoutPage)).fill(ln);
      if (zc !== undefined) await (await this.getElement(this.zipCodeCheckoutPage)).fill(zc);
    };
    
    async fillYourInformationAndCheckError (fn:string | undefined, ln:string | undefined, zc:string | undefined, err:string): Promise<void> {
      await this.fillYourInformation(fn, ln, zc);
      await (await this.getElement(this.continueBtnCheckoutPage)).click();
      await this.checkErrorText(err);
    };
    
    async clickContinueBtnCheckoutPage(): Promise<void> {
      await (await this.getElement(this.continueBtnCheckoutPage)).click();
      await expect(this.page.url()).toContain(data.checkoutStepTwoPageUrl);
    };
     
    async goToFinishCheckoutPage(): Promise<void> {
      await (await this.getElement(this.finishBtnCheckoutPage)).click();
      await expect(this.page.url()).toContain(data.checkoutCompletePageUrl);
    };
    
    async goBackToHomePage(): Promise<void> {
      await (await this.getElement(this.goBackHomeBtn)).click();
      await expect(this.page.url()).toContain(data.inventoryPageUrl);
      await expect(await this.getElement('text = Products')).toBeVisible();
    };
    
    async clickCancelCheckoutBtn(): Promise<void> {
      await (await this.getElement(this.cancelBtnCheckoutPage)).click();
    };
}