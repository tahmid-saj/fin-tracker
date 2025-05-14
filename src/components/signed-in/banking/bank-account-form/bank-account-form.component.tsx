import React, { useState, Fragment, useContext } from "react";

import Summary from "../summary/summary.component.tsx";
import Transactions from "../transactions/transactions.component.tsx";
import ActionList from "../action-list/action-list.component.ts";
import SummaryGraphBanking from "../summary-graph/summary-graph.component.tsx";

import "./bank-account-form.styles.tsx";
import { BankAccountFormContainer, TransactionsActionContainer } from "./bank-account-form.styles.tsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.ts";
import { AccordionTransition } from "../../../shared/mui/accordion/accordion.component.ts";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.ts";

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const BankAccountForm = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccountTransactions = bankingAccounts.find(account => account.name === financeItemInfo.name)?.transactions;

  return (
    <AccordionTransition header={ financeItemInfo.name } styles={ accordionStyles }>
      <BankAccountFormContainer>
        <Summary financeItemInfo={ financeItemInfo }></Summary>

        {
          bankingAccountTransactions?.length !== 0 &&
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