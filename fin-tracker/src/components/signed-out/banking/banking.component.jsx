import React, { Component, useContext } from "react";

import BankAccounts from "./bank-accounts/bank-accounts.component";

import "./banking.styles.scss";

import { BankingContext } from "../../../contexts/signed-out/banking/banking.context";
import AllBankingSummary from "./all-banking-summary/all-banking-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const Banking = () => {

  const { bankingAccounts } = useContext(BankingContext);

  return (
    <div className="banking-container">
      {
        bankingAccounts.length !== 0 && <AllBankingSummary></AllBankingSummary>
      }

      <BankAccounts label={ FINANCE_ITEM_TYPES.banking }></BankAccounts>
    </div>
  );
};

export default Banking;