import { IResolvers, Loan, MutationAddLoanArgs, RequireFields, LoanRequest } from "./types";
import LoanModel from "../api/loan/model";
import createLoanOperation from "../api/loan/create";

interface StringIndexSignatureInterface {
  [index: string]: any;
}

type StringIndexed<T> = T & StringIndexSignatureInterface;

const user = {
  id: 1,
  roles: ["admin"],
};

async function createLoan(loan: LoanRequest) {
  const result = await createLoanOperation(loan, user);

  return {
    loan: result.model as Loan,
    errors: result.contract.errorMessages(),
  };
}

export const resolvers: StringIndexed<IResolvers> = {
  Query: {
    getLoans(): Loan[] {
      return LoanModel.findAll();
    },
  },
  Mutation: {
    addLoan(parent: any, input: RequireFields<MutationAddLoanArgs, "request">, context: any) {
      return createLoan(input.request);
    },
  },
};
