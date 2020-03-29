import {
  State as BaseState,
  DynamicState,
  execute,
  nested,
  wrap,
  step,
  ok,
  fail,
  transaction,
} from "../operation/polymorphic";

class Item {}

class Model {
  find(id: number) {}
}

class Context {
  public processedItems: Item[];
}

type State = BaseState<Context, Model>;

const state = new BaseState(new Context(), new Model());
const init = step("init", (state: State) => {
  console.log("init call");
  return ok(state);
});

const suspend = step("init", (state: State) => {
  console.log("suspend call");
  return fail(state, "skip");
});

const suspend2 = step("init", (state: DynamicState) => {
  console.log("suspend 2 call");
  return fail(state, "skip");
});

const operation2 = (state: DynamicState) => {
  console.log("operation 2 call");
  return execute(state, [suspend2]);
};

async function main() {
  console.log(await execute(state, [init, nested(operation2), suspend, wrap(transaction, [init])]));
}

main();
