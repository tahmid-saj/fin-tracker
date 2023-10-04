import React from "react";

import "./bank-accounts.styles.scss";

import CreateAccount from "../create-account/create-account.component";

const BankAccounts = ({ label, financeTrackerItemNames }) => {
  return (
    <div>
      <CreateAccount label={ label } financeTrackerItemNames={ financeTrackerItemNames }></CreateAccount>
    </div>
  );
};

export default BankAccounts;
