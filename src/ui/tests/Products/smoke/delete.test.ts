//TODO: npm run test -- --spec="./src/ui/tests/Products/smoke/delete.test.ts"

import AllureReporter from "@wdio/allure-reporter";
import { NOFITICATIONS } from "../../../../data/notifications";
import { generateProductData } from "../../../../data/products/generateProduct";
import homePageService from "../../../services/homePage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import signInPageService from "../../../services/signInPage.service";

describe("[UI] [Products] Smoke", async () => {
  AllureReporter.addFeature("Products - Create");
  AllureReporter.addSuite("[UI] [Products]");

  beforeEach(async function () {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
  });

  it("Should delete created product", async function () {
    AllureReporter.addSeverity("Blocker");
    AllureReporter.addStory("US-124837");
    AllureReporter.addTag("Smoke");
    const newProductData = generateProductData();
    await addNewProductPageService.populate(newProductData);
    await productsPageService.deleteProduct(newProductData.name);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_DELETED);
  });

  afterEach(async () => {
    await signInPageService.signOut();
  });
});
