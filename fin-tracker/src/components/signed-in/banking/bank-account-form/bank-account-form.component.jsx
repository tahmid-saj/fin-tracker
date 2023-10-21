import React, { useState, Fragment } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";

import "./bank-account-form.styles.scss";

const BankAccountForm = ({ financeItemInfo }) => {

  return (
    <Fragment>
      <Summary financeItemInfo={ financeItemInfo }></Summary>

      <div className="transactions-action-container">
        <Transactions financeItemInfo={ financeItemInfo }></Transactions>

        <ActionList financeItemInfo={ financeItemInfo }></ActionList>
      </div>
    </Fragment>
  );
};

export default BankAccountForm;