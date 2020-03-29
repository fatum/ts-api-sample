import { execute, wrap } from "../../operation";
import { debug, setup } from "../../operation/base";
import { build, validate } from "../../operation/contract";

import { adminPolicy, User } from "./policy";
import { transaction, persist } from "../db";

import Loan from "./model";
import schema from "./schema";

export default (loan: Object, user: User) => {
  return execute([
    debug(true),
    setup(loan, user),
    adminPolicy,
    build,
    validate(schema),
    wrap(transaction, [persist(Loan)]),
  ]);
};
