//TODO: npm run test -- --spec="./src/api/tests/Products/get.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import { STATUS_CODES } from "../../../data/api/statusCodes";
import { generateProductData } from "../../../data/products/generateProduct";
import { IProduct } from "../../../data/types/product.types";
import { valudateResponse } from "../../../utils/validation/apiValidation";
import ProductsController from "../../controllers/products.controller";
import SignInController from "../../controllers/signIn.controller";

describe("[API] [Products] Get", async function () {
  const loginBody = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  };

  let token = "";
  let id = "";
  let productData: IProduct;

  beforeEach(async function () {
    const loginResponse = await SignInController.login(loginBody);

    expect(loginResponse.status).toBe(STATUS_CODES.OK);
    const responseToken = loginResponse.headers.get("authorization");
    token = responseToken!;

    productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, token);
    expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);

    const body = await createProductResponse.json();
    valudateResponse(body, true, null);
    id = body.Product._id;
  });

  it("Should get created product", async function () {
    const getProductResponse = await ProductsController.get(id, token);
    expect(getProductResponse.status).toBe(STATUS_CODES.OK);
    const body = await getProductResponse.json();
    valudateResponse(body, true, null);
    const createdProduct = body.Product;
    expect(createdProduct).toMatchObject({ ...productData });
  });

  afterEach(async function () {
    const response = await ProductsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});
