import { State, ok, fail, step } from ".";
import { Schema } from "./schema/types";
import { validate as runValidation, ValidationResult } from "./schema/validator";

class Contract {
  private _result: { isValid: boolean; errors: ValidationResult[] };

  constructor(private _params: {}) {}

  errorMessages() {
    return this.errors
      .map((error) => {
        const errors = error.errors || [];
        return errors.map((message) => `${error.attribute} ${message}`);
      })
      .flat();
  }

  get errors() {
    return this._result.errors;
  }

  async validate(schema: Schema): Promise<boolean> {
    this._result = await runValidation(schema, this._params);

    return this.isValid;
  }

  get isValid(): boolean {
    return this._result ? this._result.isValid : false;
  }
}

const build = step("contract.build", (state: State) => {
  state.contract = new Contract(state.params);

  return ok(state);
});

const validate = (schema: Schema) =>
  step("contract.validate", async (state: State) => {
    if (await state.contract.validate(schema)) {
      return ok(state);
    } else {
      return fail("error");
    }
  });

const persist = step("contract.persist", (state: State) => {
  console.log("--- Persist operation");

  return ok(state);
});

export { persist, build, validate, Contract };
