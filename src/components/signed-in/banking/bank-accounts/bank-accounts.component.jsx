import React, { useContext } from "react";

import "./bank-accounts.styles.scss";

import CreateAccount from "../create-account/create-account.component";

const BankAccounts = ({ label }) => {

  return (
    <div>
      <CreateAccount label={ label }></CreateAccount>
    </div>
  );
};

export default BankAccounts;