import { IProduct } from "../../../data/types/product.types";
import addNewProductPage from "../../pages/Products/addNewProduct.page";
import productsPage from "../../pages/Products/products.page";
import { SalesPortalPageService } from "../salesPortalPage.service";

class ProductsPageService extends SalesPortalPageService {
  private productsPage = productsPage;
  private addNewProductPage = addNewProductPage;

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.addNewProductPage.waitForPageOpened();
  }

  async checkProductInTable(product: IProduct) {
    const actualProductData = await this.productsPage.getProductFromTable(product.name);
    const expectedProductData = {
      name: product.name,
      price: product.price,
      manufacturer: product.manufacturer,
    };
    expect(actualProductData).toEqual(expectedProductData);
  }

  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.productsPage["Delete Modal"].waitForPageOpened();
    await this.productsPage["Delete Modal"].clickOnDeleteButton();
    await this.productsPage["Delete Modal"].waitForDisappeared();
    await this.productsPage.waitForPageOpened();
  }
}

export default new ProductsPageService();
