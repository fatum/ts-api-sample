import { State, ok, step } from ".";
import { User } from "./policy";

const debug = (value: boolean) => {
  return step("base.debug", (state: State) => {
    state.debug = value;
    return ok(state);
  });
};

const setup = (params: Object, user: User) => {
  return step("base.setup", (state: State) => {
    state.params = params;
    state.user = user;

    return ok(state);
  });
};

const transaction = async (state: State, cb: Function) => {
  console.log("Start transaction");
  await cb();
  console.log("End transaction");

  return true;
};

export { debug, setup, transaction };
