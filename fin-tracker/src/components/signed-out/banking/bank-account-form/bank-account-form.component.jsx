import React, { useState, Fragment } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";

import "./bank-account-form.styles.scss";

const BankAccountForm = ({ financeItemName, closeAccountHandler }) => {
  const [newTransaction, setNewTransaction] = useState(false);
  const [newDepositAmount, setNewTransactionAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("DEPOSIT");

  const newTransactionHandler = (amount, type) => {
    setNewTransaction(true);
    setNewTransactionAmount(amount);
    setTransactions([...transactions, {
      amount: amount,
      type: type,
    }]);
    setTransactionType(type);

    console.log("new transaction: " + amount);
  }

  return (
    <Fragment>
      <Summary></Summary>
      <div className="transactions-action-container">
        <Transactions newTransaction={ newTransaction } newDepositAmount={ newDepositAmount } 
                      transactions={ transactions } transactionType={ transactionType }></Transactions>

        <ActionList closeAccountHandler={ closeAccountHandler }
                    newTransactionHandler={ newTransactionHandler }></ActionList>
      </div>
    </Fragment>
  );
};

export default BankAccountForm;