import { STATUS_CODES } from "../../../data/api/statusCodes";
import { validateResponse } from "../../../utils/validation/apiValidation";
import productsController from "../../controllers/products.controller";
import productApiService from "../../service/productApi.service";
import { SignInApiService } from "../../service/signInApiService.service";

describe("[API] [Products] Get All", async function () {
  const signInApiService = new SignInApiService();

  beforeEach(async function () {
    const token = await signInApiService.signInAsAdmin();
    await productApiService.create(token);
  });

  it("Should get created product", async function () {
    const getAllProductResponse = await productsController.getAll(signInApiService.getToken());
    expect(getAllProductResponse.status).toBe(STATUS_CODES.OK);
    validateResponse(getAllProductResponse, STATUS_CODES.OK, true, null);
    const receivedProducts = getAllProductResponse.body.Products;
    expect(receivedProducts.length).toBeGreaterThan(0);
  });

  afterEach(async function () {
    await productApiService.delete(signInApiService.getToken());
  });
});
