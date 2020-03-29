import { create, all, bignumber, BigNumber } from "mathjs";

const config = {
  number: "BigNumber",
  precision: 64,
};

const math = create(all, config);

const build = (expression: string) => {
  if (math.compile) {
    return math.compile(expression);
  } else {
    throw Error(`Invalid expression: '${expression}'`);
  }
};

export { build, math, bignumber, BigNumber };
