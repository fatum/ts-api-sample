import updateLoan from "../api/loan/update";

const loan = {
  id: 1,
  valuation: 500000,
  principal: 100000,
  interest: 100000,
  properties: [
    {
      address_1: "Minsk, Belarus",
      address_2: "Minsk, Belarus",
      city: "Minsk",
      state: "Minsk",
      zip: "220075",
    },
  ],
};

const user = {
  id: 1,
  roles: ["admin"],
};

let run = async () => {
  const result = await updateLoan(loan, user);

  console.log("Finished:", result.isValid(), result.contract.errors);
};

run();
