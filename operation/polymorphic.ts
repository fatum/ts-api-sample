import { Either, Wrapper } from "./utils";
import { State as BaseState } from "./index";
import { db } from "./../api/db";

type Action = "skip" | "error" | "continue";
type OperationType = "step" | "error" | "wrap";

type OperationCompleted<C, M> = Either<Action, State<C, M>>;
type OperationResponse<C, M> = OperationCompleted<C, M> | Promise<OperationCompleted<C, M>>;
type Operation<C, M> = (state: State<C, M>) => OperationResponse<C, M>;
type Definition<C, M> = { name: string; type: OperationType; handler: Operation<C, M> };

type DynamicState = State<Map<string, any>, Map<string, any>>;
type DynamicMap = Map<string, any>;

function debug<C, M>(action: Action, state: State<C, M>, definition: Definition<C, M>) {
  if (state.debug) {
    console.log(`Operation '${definition.name}' -> ${action}`);
  }
}

class State<C, M> extends BaseState {
  constructor(public context: C, public model: M) {
    super();
  }
}

class Result<C, M> {
  constructor(public state: State<C, M>, private action: Action) {}

  isValid() {
    return this.action !== "error";
  }

  get contract() {
    return this.state.contract;
  }
}

function fail<C, M>(state: State<C, M>, action: Action): OperationResponse<C, M> {
  return { tag: "left", value: action };
}

function ok<C, M>(state: State<C, M>): OperationResponse<C, M> {
  return { tag: "right", value: state };
}

function step<C, M>(name: string, handler: Operation<C, M>): Definition<C, M> {
  return {
    name,
    type: "step",
    handler: handler,
  };
}

function wrap<C, M>(
  handler: (state: State<C, M>, cb: Function) => Promise<Boolean>,
  definitions: Definition<C, M>[]
): Definition<C, M> {
  return step(
    "wrapper",
    async <C, M>(state: any): Promise<OperationCompleted<C, M>> => {
      let execution: Action = "continue";

      let result = handler(state, async <C, M>() => {
        for (const definition of definitions) {
          debug(execution, state, definition);

          execution = await process(state, definition, execution);
          if (execution == "error") {
            throw new Error("Wrapped step error");
          }
        }
      });

      if ((await result) && execution == "continue") {
        return ok(state);
      } else {
        return fail(state, execution);
      }
    }
  );
}

type NestedOperation = (dynState: DynamicState) => Promise<Result<DynamicMap, DynamicMap>>;

function nested<C, M>(operation: NestedOperation): Definition<C, M> {
  const execute = async <C, M>(state: any): Promise<OperationCompleted<C, M>> => {
    const dynamicState = new State(new Map<string, any>(), new Map<string, any>());
    const result = await operation(dynamicState);

    if (result.isValid()) {
      return ok(state);
    } else {
      return fail(state, "error");
    }
  };

  return step("nested", execute);
}

async function process<C, M>(
  state: State<C, M>,
  definition: Definition<C, M>,
  execution: Action
): Promise<Action> {
  if (execution === "continue") {
    let result: OperationCompleted<C, M> = await new Wrapper(definition.handler(state)).unwrap();

    if (result.tag === "left") {
      return result.value;
    } else {
      return execution;
    }
  } else {
    return execution;
  }
}

async function execute<C, M>(state: State<C, M>, definitions: Definition<C, M>[]) {
  let execution: Action = "continue";

  for (const definition of definitions) {
    debug(execution, state, definition);

    execution = await process(state, definition, execution);
  }

  return new Result(state, execution);
}

const transaction = async (state: { transaction: any }, cb: Function) => {
  const t = await db.transaction();

  try {
    state.transaction = t;
    await cb();
    await t.commit();
    return true;
  } catch {
    await t.rollback();
    return false;
  }
};

function convert<C, M>(name: string, handler: Operation<C, M>) {
  return step(`convert: ${name}`, (state: BaseState) => {
    const newState = state as State<C, M>;
    return handler(newState);
  });
}

export { State, DynamicState, execute, nested, step, wrap, ok, fail, transaction, convert };
