"use strict";
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    "Loan",
    {
      valuation: DataTypes.DECIMAL,
      interest: DataTypes.DECIMAL,
      principal: DataTypes.DECIMAL,
    },
    {}
  );
  Loan.associate = function (models) {
    // associations can be defined here
  };
  return Loan;
};
