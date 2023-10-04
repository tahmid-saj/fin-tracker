import React from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";

import "./bank-account-form.styles.scss";

const BankAccountForm = () => {
  return (
    <div>
      <Summary></Summary>

      <div className="transactions-action-container">
        <Transactions></Transactions>

        <ActionList></ActionList>
      </div>
    </div>
  );
};

export default BankAccountForm;