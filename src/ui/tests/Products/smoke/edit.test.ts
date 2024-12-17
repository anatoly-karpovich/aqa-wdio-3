//TODO: npm run test -- --spec="./src/ui/tests/Products/smoke/edit.test.ts"

import { NOFITICATIONS } from "../../../../data/notifications";
import { generateProductData } from "../../../../data/products/generateProduct";
import { IProduct, MANUFACTURERS } from "../../../../data/types/product.types";
import homePageService from "../../../services/homePage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";
import editProductPageService from "../../../services/Products/editProductPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import signInPageService from "../../../services/signInPage.service";

describe("[UI] [Products] Smoke", async function () {
  let newProductData: IProduct;

  beforeEach(async function () {
    newProductData = generateProductData();
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
    await addNewProductPageService.populate(newProductData);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_CREATED);
  });

  it("Should open Edit Product page with created product", async function () {
    await productsPageService.openEditProductPage(newProductData.name);
    await editProductPageService.checkPageTitle(newProductData.name);
  });

  it("Should validate Product data on Edit Product page", async function () {
    await productsPageService.openEditProductPage(newProductData.name);
    const actualObject: IProduct = {
      name: await $("#inputName").getValue(),
      amount: +(await $("#inputAmount").getValue()),
      price: +(await $("#inputPrice").getValue()),
      manufacturer: (await $("#inputManufacturer").getValue()) as MANUFACTURERS,
      notes: await $("#textareaNotes").getValue(),
    };

    expect(actualObject).toMatchObject({ ...newProductData });
  });

  afterEach(async () => {
    // await productsPageService.deleteProduct(newProductData.name);
    // await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_DELETED);
    await signInPageService.signOut();
  });
});
