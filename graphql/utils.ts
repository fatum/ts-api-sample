import { IResolvers } from "./types";
import { RequireFields, MutationAddLoanArgs } from "./types";

interface StringIndexSignatureInterface {
  [index: string]: any;
}

// This type is needed for apollo server type safety
type StringIndexed<T> = T & StringIndexSignatureInterface;
type Resolvers = StringIndexed<IResolvers>;
type AddLoanInputs = RequireFields<MutationAddLoanArgs, "request">;

export { Resolvers, AddLoanInputs };
