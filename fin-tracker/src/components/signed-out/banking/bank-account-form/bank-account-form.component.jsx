import React, { useState, Fragment, useContext } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";
import SummaryGraphBanking from "../summary-graph/summary-graph.component";

import "./bank-account-form.styles.scss";

import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

const BankAccountForm = ({ financeItemInfo }) => {
  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccountTransactions = bankingAccounts.find(account => account.name === financeItemInfo).transactions;

  return (
    <Fragment>
      {
        bankingAccountTransactions.length !== 0 &&
        <SummaryGraphBanking financeItemInfo={ financeItemInfo }></SummaryGraphBanking>
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