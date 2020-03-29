import { execute, wrap } from "../../operation";
import { debug, setup } from "../../operation/base";
import { build, validate } from "../../operation/contract";
import { LoanRequest } from "../../graphql/types";

import { adminPolicy, User } from "./policy";
import { transaction, persist } from "../db";

import Loan from "./model";
import schema from "./schema";

export async function createLoan(loan: LoanRequest, user: User) {
  const result = await createLoanOperation(loan, user);

  return {
    loan: result.model as Loan,
    errors: result.contract.errorMessages(),
  };
}

const createLoanOperation = (loan: Object, user: User) => {
  return execute([
    debug(true),
    setup(loan, user),
    adminPolicy,
    build,
    validate(schema),
    wrap(transaction, [persist(Loan)]),
  ]);
};

export default createLoanOperation;
