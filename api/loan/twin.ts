import Loan from "./model";
import { build, bignumber, BigNumber } from "../calculator";

class Twin {
  private equation = build("(a + b + c) * 15 / 2.4345");

  constructor(private loan: Loan) {}

  sumOfColumns(): BigNumber {
    const scope = {
      a: bignumber(this.loan.valuation),
      b: bignumber(this.loan.principal),
      c: bignumber(this.loan.interest),
    };

    return this.equation.evaluate(scope);
  }
}

export default Twin;
