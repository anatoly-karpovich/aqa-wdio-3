import { SalesPortalPage } from "../salesPortal.page";

class ProductsPage extends SalesPortalPage {
  readonly ["Add New Product"] = "button.page-title-button";
  readonly Title = '//h2[.="Products List "]';

  async clickOnAddNewProduct() {
    await this.click(this["Add New Product"]);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden("Products");
  }
}

export default new ProductsPage();
