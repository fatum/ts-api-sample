import {
  Handler,
  CustomValidator,
  StringValidator,
  NumberValidator,
  ArrayValidator,
  RequiredValidator,
  StringParams,
  NumberParams,
  ArrayParams,
} from "./types";

import { stringValidate, numberValidate, validate } from "./validator";

const string = (params: StringParams = {}): StringValidator => ({
  validator: "string",
  validate: stringValidate,
  params,
});

const number = (params: NumberParams = {}): NumberValidator => ({
  validator: "number",
  validate: numberValidate,
  params,
});

function array(params: ArrayParams): ArrayValidator {
  return { validator: "array", params };
}

function custom(handler: Handler, params: any = {}): CustomValidator {
  return { validator: "custom", validate: handler, params };
}

function required(): RequiredValidator {
  return { validator: "required", validate: (input: any) => (input ? [] : ["must be present"]) };
}

export { string, number, array, custom, validate, required };
