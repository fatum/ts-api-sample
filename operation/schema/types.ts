import { StringValidatorHandler, NumberValidatorHandler } from "./validator";

type Handler = (value: any, params: {}) => string[] | Promise<string[]>;
type Converter<T, U> = (value: T) => U;

type StringParams = {
  min?: number;
  max?: number;
  optional?: boolean;
  type?: Converter<string, number>;
};
type NumberParams = {
  min?: number;
  max?: number;
  optional?: boolean;
  type?: Converter<any, number>;
};
type ArrayParams = { items: Schema; optional?: boolean };

type CustomValidator = { validator: "custom"; validate: Handler; params: any };
type StringValidator = {
  validator: "string";
  validate: StringValidatorHandler;
  params: StringParams;
};
type NumberValidator = {
  validator: "number";
  params: NumberParams;
  validate: NumberValidatorHandler;
};
type RequiredValidator = {
  validator: "required";
  params?: any;
  validate: (input: any) => string[];
};
type ArrayValidator = { validator: "array"; params: ArrayParams };
type Validator =
  | StringValidator
  | NumberValidator
  | ArrayValidator
  | RequiredValidator
  | CustomValidator;
type Attribute = { type: (input: any) => any; check: Validator | Validator[] };
type Value = Attribute | Validator | Validator[];
type Schema = { [key: string]: Value };

export {
  Schema,
  Attribute,
  Value,
  Validator,
  Handler,
  StringValidator,
  CustomValidator,
  ArrayValidator,
  NumberValidator,
  RequiredValidator,
  StringParams,
  NumberParams,
  ArrayParams,
};
