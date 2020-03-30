import { Resolvers, AddLoanInputs } from "./utils";
import LoanModel from "../api/loan/model";
import { createLoan } from "../api/loan/create";

const user = {
  id: 1,
  roles: ["admin"],
};

export const resolvers: Resolvers = {
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
