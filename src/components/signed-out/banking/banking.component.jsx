import React, { Component, useContext, useEffect, Fragment } from "react";
import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../store/signed-out/banking/banking.selector";
import { setBankingSummary } from "../../../store/signed-out/banking/banking.action";

import BankAccounts from "./bank-accounts/bank-accounts.component";

import "./banking.styles.scss";

// import { BankingContext } from "../../../contexts/signed-out/banking/banking.context";
import AllBankingSummary from "./all-banking-summary/all-banking-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import SummaryGraphBanking from "./summary-graph/summary-graph.component";

const Banking = () => {
  // const { bankingAccounts } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)
  const dispatch = useDispatch()

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts);

    console.log(bankingAccounts);

    dispatch(setBankingSummary({ 
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut 
    }))
  }, [bankingAccounts, dispatch])

  return (
    <div className="banking-container">
      {
        bankingAccounts.length !== 0 && 
        <Fragment>
          <AllBankingSummary></AllBankingSummary>
        </Fragment>
      }

      <BankAccounts label={ FINANCE_ITEM_TYPES.banking }></BankAccounts>
    </div>
  );
};

export default Banking;