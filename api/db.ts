import { State, step, ok, fail } from "../operation";

const db = require("./../models").sequelize;

type Model = {
  create(params: {}, options: {}): {};
  create(params: {}, options: {}): {};
  findOne(args: {}): {};
};

const load = (model: Model) =>
  step("model.load", async (state: State) => {
    const params = state.params as { id: number | undefined };

    if (!params.id) {
      return fail("error");
    }

    const record = (await model.findOne({ where: { id: params.id } })) as { interest: number };

    if (record) {
      state.model = record;
      return ok(state);
    } else {
      return fail("error");
    }
  });

const persist = (model: Model) =>
  step("contract.persist", async (state: State) => {
    console.log("--- Persisting operation");
    if (state.model) {
      await state.model.update(state.params, { transaction: state.transaction });
    } else {
      state.model = await model.create(state.params, { transaction: state.transaction });
    }
    console.log("--- End persisting operation");

    return ok(state);
  });

const transaction = async (state: State, cb: Function) => {
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

export { db, transaction, persist, load };
