import { STATUS_CODES } from "../../data/api/statusCodes";
import { productResponseSchema } from "../../data/jsonSchemas/product.schema";
import { generateProductData } from "../../data/products/generateProduct";
import { IProduct, IProductFromResponse } from "../../data/types/product.types";
import { validateJsonSchema, validateResponse } from "../../utils/validation/apiValidation";
import productsController from "../controllers/products.controller";

class ProductApiService {
  private createdProduct: IProductFromResponse | null = null;
  constructor(private controller = productsController) {}

  async create(token: string, customData?: Partial<IProduct>) {
    const response = await this.controller.create(generateProductData(customData), token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, response);
    this.createdProduct = response.body.Product;
    return response.body.Product;
  }

  getCreatedProduct() {
    if (!this.createdProduct) throw new Error("No product was created");
    return this.createdProduct;
  }

  async delete(token: string) {
    const response = await this.controller.delete(this.getCreatedProduct()._id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
    this.createdProduct = null;
  }
}

export default new ProductApiService();
