import {
  Schema,
  StringParams,
  NumberParams,
  Attribute,
  Validator,
  StringValidator,
  NumberValidator,
  CustomValidator,
  RequiredValidator,
} from "./types";

import isByteLength from "validator/lib/isByteLength";

import { Wrapper } from "../utils";

type StringValidatorHandler = (input: string, params: StringParams) => string[];
type NumberValidatorHandler = (input: string | number, params: StringParams) => string[];
type ValidationResult = { attribute: string; isValid: boolean; errors?: string[] };
type NotNestedValidator = StringValidator | NumberValidator | CustomValidator | RequiredValidator;

const stringValidate = (input: string, params: StringParams): string[] => {
  const errors: string[] = [];

  if (!input) {
    return ["must be present"];
  }

  if (typeof input !== "string") {
    return ["must be a string"];
  }

  if (!isByteLength(input, params)) {
    errors.push(`must be a string with length ${params.min}:${params.max || "~"}`);
  }

  return errors;
};

const numberValidate = (input: any, params: NumberParams): string[] => {
  return [];
};

const check = async (
  prop: string,
  validator: NotNestedValidator,
  value: any
): Promise<ValidationResult> => {
  let result = await new Wrapper(validator.validate(value, validator.params)).unwrap();

  return { attribute: prop, isValid: result.length === 0, errors: result };
};

class ValidationHandler {
  private _coercedInput: any;
  private _errors: any = [];

  constructor(private _schema: Schema, private _input: any) {}

  async validate() {
    this._errors = [];
    this.iterate(this._schema, this._input);

    const results = this.aggregate((await Promise.all(this._errors)) as ValidationResult[]);

    return { isValid: results.length === 0, errors: results };
  }

  // Apply coercions
  coerced(): any {}

  private aggregate(errors: ValidationResult[]): ValidationResult[] {
    return errors.filter((error) => (error.errors || []).length > 0);
  }

  private processAttribute(prop: string, param: any, value: Attribute) {}

  private processValidators(prop: string, param: any, value: Validator | Validator[]) {
    const validators = (value instanceof Array ? value : Array(value)) as Validator[];
    validators.forEach((validator) => {
      if (validator.validator === "array") {
        const newSchema = validator.params.items;

        if (param instanceof Array) {
          param.forEach((nested: any) => this.iterate(newSchema, nested));
        }
      } else {
        this._errors.push(check(prop, validator, param));
      }
    });
  }

  private iterate(partial: any, params: any) {
    Object.keys(partial).forEach((prop: string) => {
      const value = partial[prop];
      const param = params[prop];

      if (value.type !== undefined) {
        this.processAttribute(prop, param, value);
      } else {
        this.processValidators(prop, param, value);
      }
    });
  }
}

async function validate(schema: Schema, input: any) {
  return new ValidationHandler(schema, input).validate();
}

export {
  ValidationResult,
  StringValidatorHandler,
  NumberValidatorHandler,
  stringValidate,
  numberValidate,
  validate,
};
