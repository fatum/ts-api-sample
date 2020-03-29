import { RequireFields, MutationAddLoanArgs } from "./types";

interface StringIndexSignatureInterface {
  [index: string]: any;
}

// This type is needed for apollo server type safety
type StringIndexed<T> = T & StringIndexSignatureInterface;

type AddLoanInputs = RequireFields<MutationAddLoanArgs, "request">;

export { StringIndexed, AddLoanInputs };
