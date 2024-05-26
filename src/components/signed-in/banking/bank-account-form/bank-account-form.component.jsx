import React, { useState, Fragment, useContext } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";
import SummaryGraphBanking from "../summary-graph/summary-graph.component";

import "./bank-account-form.styles.scss";

// import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-in/banking/banking.selector";

const BankAccountForm = ({ financeItemInfo }) => {
  // const { bankingAccounts } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)

  const bankingAccountTransactions = bankingAccounts.find(account => account.name === financeItemInfo).transactions;

  return (
    <Fragment>
      {
        bankingAccountTransactions.length !== 0 &&
        <Fragment>
          <h2>Banking Transactions</h2>
          <SummaryGraphBanking financeItemInfo={ financeItemInfo }></SummaryGraphBanking>
        </Fragment>
      }
      
      <Summary financeItemInfo={ financeItemInfo }></Summary>

      <div className="transactions-action-container">
        <Transactions financeItemInfo={ financeItemInfo }></Transactions>

        <ActionList financeItemInfo={ financeItemInfo }></ActionList>
      </div>
    </Fragment>
  );
};

export default BankAccountForm;
