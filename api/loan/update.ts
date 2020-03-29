import { execute, wrap } from "../../operation";
import { debug, setup } from "../../operation/base";
import { build, validate } from "../../operation/contract";

import { adminPolicy, User } from "./policy";
import { transaction, persist, load } from "../db";

import Loan from "./model";
import schema from "./schema";

export default (params: Object, user: User) => {
  return execute([
    debug(true),
    setup(params, user),
    load(Loan),
    adminPolicy,
    build,
    validate(schema),
    wrap(transaction, [persist(Loan)]),
  ]);
};
