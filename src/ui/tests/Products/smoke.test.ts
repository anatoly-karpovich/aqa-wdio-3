//TODO: npm run test -- --spec="./src/ui/tests/Products/smoke.test.ts"

import * as _ from "lodash";
import { NOFITICATIONS } from "../../../data/notifications";
import { generateProductData } from "../../../data/products/generateProduct";
import homePageService from "../../services/homePage.service";
import productsPageService from "../../services/Products/productsPage.service";
import addNewProductPageService from "../../services/Products/addNewProductPage.service";
import signInPageService from "../../services/signInPage.service";

describe("[UI] [Products] Smoke", () => {
  beforeEach(async function () {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
  });

  it("Should create product with smoke data", async function () {
    const newProductData = generateProductData();

    await addNewProductPageService.populate(newProductData);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_CREATED);
    await productsPageService.checkProductInTable(newProductData);
  });

  it("Should delete created product", async function () {
    const newProductData = generateProductData();

    await addNewProductPageService.populate(newProductData);
    await productsPageService.deleteProduct(newProductData.name);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_DELETED);
  });

  afterEach(async () => {
    await signInPageService.signOut();
  });
});
