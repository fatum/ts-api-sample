import Loan from "./loan/model";
import LoanTwin from "./loan/twin";

async function main() {
  const twin = new LoanTwin(await Loan.findOne());

  console.log(twin.sumOfColumns().toString());
}

main();
