import React, { useState, Fragment, useContext } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";
import SummaryGraphBanking from "../summary-graph/summary-graph.component";

import "./bank-account-form.styles.jsx";
import { BankAccountFormContainer, TransactionsActionContainer } from "./bank-account-form.styles.jsx";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import { AccordionTransition } from "../../../shared/mui/accordion/accordion.component.jsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const BankAccountForm = ({ financeItemInfo }) => {
  // const { bankingAccounts } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)

  const bankingAccountTransactions = bankingAccounts.find(account => account.name === financeItemInfo.name).transactions;

  return (
    <AccordionTransition header={ financeItemInfo.name } styles={ accordionStyles }>
      <BankAccountFormContainer>
        <Summary financeItemInfo={ financeItemInfo }></Summary>

        {
          bankingAccountTransactions.length !== 0 &&
          <Fragment>
            <SummaryGraphBanking financeItemInfo={ financeItemInfo }></SummaryGraphBanking>
          </Fragment>
        }

        <TransactionsActionContainer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4">
                {
                  financeItemInfo.transactions && financeItemInfo.transactions.length !== 0 ?
                  <Transactions financeItemInfo={ financeItemInfo }></Transactions> : null
                }
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <ActionList financeItemInfo={ financeItemInfo }></ActionList>
              </div>
            </div>
          </div>
        </TransactionsActionContainer>
      </BankAccountFormContainer>
    </AccordionTransition>
  );
};

export default BankAccountForm;
