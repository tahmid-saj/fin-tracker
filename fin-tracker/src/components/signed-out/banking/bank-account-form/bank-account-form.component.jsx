import React, { useState, Fragment } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";

import "./bank-account-form.styles.scss";

const BankAccountForm = ({ financeItemName, closeAccountHandler }) => {
  return (
    <Fragment>
      <Summary></Summary>
      <div className="transactions-action-container">
        <Transactions></Transactions>

        <ActionList closeAccountHandler={ closeAccountHandler }></ActionList>
      </div>
    </Fragment>
  );
};

export default BankAccountForm;