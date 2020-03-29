import Loan from "./model";
import { string, custom, array, required } from "../../operation/schema/definitions";

const isPropertiesUniq = (input: any, params: { properties: [] }) => {
  return [];
};

const propertySchema = {
  address1: string({ min: 5 }),
  address2: string({ min: 5 }),
  city: required(),
  state: required(),
  zip: required(),
};

export default {
  valuation: required(),
  principal: required(),
  interest: required(),
  properties: [required(), array({ items: propertySchema })],
};
