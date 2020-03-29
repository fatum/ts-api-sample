import { Either, Wrapper } from "./utils";
import { Contract } from "./contract";

type Action = "skip" | "error" | "continue";
type OperationType = "step" | "error" | "wrap";

type OperationCompleted = Either<Action, State>;
type OperationResponse = OperationCompleted | Promise<OperationCompleted>;
type Operation = (state: State) => OperationResponse;
type Definition = { name: string; type: OperationType; handler: Operation };

class State {
  private _debug = false;
  private _params: Object;
  private _contract: Contract;
  private _user: { roles: string[] };
  private _model: any;
  private _transaction: any;

  get transaction() {
    return this._transaction;
  }
  set transaction(data) {
    this._transaction = data;
  }

  get model() {
    return this._model;
  }
  set model(model) {
    this._model = model;
  }

  get user() {
    return this._user;
  }
  set user(user) {
    this._user = user;
  }

  get params() {
    return this._params;
  }
  set params(params) {
    this._params = params;
  }

  get debug() {
    return this._debug;
  }
  set debug(debug) {
    this._debug = debug;
  }

  get contract() {
    return this._contract;
  }
  set contract(contract) {
    this._contract = contract;
  }
}

class Result {
  constructor(public state: State, private action: Action) {}

  isValid() {
    return this.action !== "error";
  }

  get model() {
    return this.state.model;
  }

  get contract() {
    return this.state.contract;
  }
}

function debug(action: Action, state: State, definition: Definition) {
  if (state.debug) {
    console.log(`Operation '${definition.name}' -> ${action}`);
  }
}

async function process(state: State, definition: Definition, execution: Action): Promise<Action> {
  if (execution === "continue") {
    let result = await new Wrapper(definition.handler(state)).unwrap();

    if (result.tag === "left") {
      return result.value;
    } else {
      return execution;
    }
  } else {
    return execution;
  }
}

function step(name: string, handler: Operation): Definition {
  return {
    name,
    type: "step",
    handler: handler,
  };
}

function error(name: string, handler: Operation): Definition {
  return {
    name,
    type: "error",
    handler: handler,
  };
}

function fail(action: Action): OperationResponse {
  return { tag: "left", value: action };
}

function ok(state: State): OperationResponse {
  return { tag: "right", value: state };
}

function wrap(
  handler: (state: State, cb: Function) => Promise<Boolean>,
  definitions: Definition[]
) {
  return step("wrapper", async (state: State) => {
    let execution: Action = "continue";

    let result = handler(state, async () => {
      for (const definition of definitions) {
        debug(execution, state, definition);

        execution = await process(state, definition, execution);
        if (execution == "error") {
          throw new Error("Wrapped step error");
        }
      }
    });

    if ((await new Wrapper(result).unwrap()) && execution == "continue") {
      return ok(state);
    } else {
      return fail(execution);
    }
  });
}

function execute(definitions: Definition[]) {
  return executeWithState(new State(), definitions);
}

async function executeWithState(state: State, definitions: Definition[]) {
  let execution: Action = "continue";

  for (const definition of definitions) {
    debug(execution, state, definition);

    execution = await process(state, definition, execution);
  }

  return new Result(state, execution);
}

export {
  step,
  wrap,
  error,
  fail,
  ok,
  execute,
  executeWithState,
  Result,
  State,
  OperationResponse,
  Operation,
  Definition,
};
