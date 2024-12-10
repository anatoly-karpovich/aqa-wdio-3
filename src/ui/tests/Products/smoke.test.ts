//TODO: npm run test -- --spec="./src/ui/tests/Products/smoke.test.ts"

import { NOFITICATIONS } from "../../../data/notifications";
import { generateProductData } from "../../../data/products/generateProduct";
import homePage from "../../pages/home.page";
import addNewProductPage from "../../pages/Products/addNewProduct.page";
import productsPage from "../../pages/Products/products.page";

describe("[UI] [Products] Smoke", () => {
  beforeEach(async function () {
    await browser.url("https://anatoly-karpovich.github.io/aqa-course-project/");
    const emailSelector = "#emailinput";
    const passwordSelector = "#passwordinput";
    const loginButtonSelector = 'button[type="submit"]';

    await $(emailSelector).setValue("");
    await $(passwordSelector).setValue("");
    await $(loginButtonSelector).click();
    await homePage.waitForPageOpened();
  });

  // it.skip("Should create product with smoke data", async function () {
  //   await homePage.clickOnMenuButton("Products");
  //   await waitForPageIsOpened("Products");
  //   await productsPage.clickOnAddNewProduct();
  //   await waitForPageIsOpened("Add New Product");

  //   const name = $("#inputName");
  //   const manufacturer = $("#inputManufacturer");
  //   const price = $("#inputPrice");
  //   const amount = $("#inputAmount");
  //   const notes = $("#textareaNotes");
  //   const saveButton = $("#save-new-product");

  //   const newProductData: IProduct = {
  //     name: "Test Product" + Date.now(),
  //     manufacturer: MANUFACTURERS.APPLE,
  //     amount: 10,
  //     price: 999,
  //     notes: "Test notes",
  //   };
  //   await name.setValue(newProductData.name);
  //   await manufacturer.selectByVisibleText(newProductData.manufacturer);
  //   await price.setValue(newProductData.price);
  //   await amount.setValue(newProductData.amount);
  //   await notes.setValue(newProductData.notes!);
  //   await expect(saveButton).toBeEnabled();
  //   await saveButton.click();
  //   await $('//h2[.="Products List "]').waitForDisplayed();
  //   await $(".toast-body").waitForDisplayed();
  //   const notificationText = await $(".toast-body").getText();
  //   expect(notificationText).toBe("Product was successfully created");
  // });

  it("Should create product with smoke data", async function () {
    await homePage.clickOnMenuButton("Products");
    await productsPage.waitForPageOpened();
    await productsPage.clickOnAddNewProduct();
    await addNewProductPage.waitForPageOpened();
    const newProductData = generateProductData();
    await addNewProductPage.fillInputs(newProductData);
    await addNewProductPage.clickOnSaveButton();
    const notificationText = await productsPage.getNotificationText();
    expect(notificationText).toBe(NOFITICATIONS.PRODUCT_CREATED);
  });
});
