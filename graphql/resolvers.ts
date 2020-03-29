import { IResolvers } from "./types";
import { StringIndexed, AddLoanInputs } from "./utils";
import LoanModel from "../api/loan/model";
import { createLoan } from "../api/loan/create";

const user = {
  id: 1,
  roles: ["admin"],
};

export const resolvers: StringIndexed<IResolvers> = {
  Query: {
    getLoans() {
      return LoanModel.findAll();
    },
  },
  Mutation: {
    addLoan(_parent: any, input: AddLoanInputs, _context: any) {
      return createLoan(input.request, user);
    },
  },
};
