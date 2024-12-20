import Ajv from "ajv";
import { expect } from "chai";

export function validateJsonSchema(schema: object, body: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(body);

  if (isValid) {
    console.log("Data is valid according to the schema.");
  } else {
    console.log("Data is not valid according to the schema.");
    console.log(validate.errors);
  }
  expect(isValid).to.equal(true);
}

export async function valudateResponse(
  body: { IsSuccess: boolean; ErrorMessage: null | string },
  IsSuccess: boolean,
  ErrorMessage: string | null
) {
  expect(body.IsSuccess).to.equal(IsSuccess);
  expect(body.ErrorMessage).to.equal(ErrorMessage);
}
