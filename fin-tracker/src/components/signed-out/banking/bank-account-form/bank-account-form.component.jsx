import React, { useState, Fragment } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";

import "./bank-account-form.styles.scss";

const BankAccountForm = ({ financeItemName, closeAccountHandler }) => {
  const [newTransaction, setNewTransaction] = useState(false);

  const newTransactionHandler = () => {
    setNewTransaction(true);

    console.log("new transaction");
  }

  return (
    <Fragment>
      <Summary></Summary>
      <div className="transactions-action-container">
        <Transactions newTransaction={ newTransaction }></Transactions>

        <ActionList closeAccountHandler={ closeAccountHandler }
                    newTransactionHandler={ newTransactionHandler }></ActionList>
      </div>
    </Fragment>
  );
};

export default BankAccountForm;