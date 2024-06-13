import React, { Component, useEffect } from "react";

import "./savings.styles.scss";

import CreateAccountForm from "../../../components/signed-out/savings/create-account-form/create-account-form.component";

// import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
import { useDispatch, useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../store/signed-out/savings/savings.selector";
import { setSavingsAccountsSummary } from "../../../store/signed-out/savings/savings.action";

import AllSavingsSummary from "../../../components/signed-out/savings/all-savings-summary/all-savings-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import SavingsGoalCalculator from "../../../components/shared/savings-goal-calculator/savings-goal-calculator.component";

const Savings = () => {
  // const { savingsAccounts } = useContext(SavingsContext);
  const dispatch = useDispatch()
  const savingsAccounts = useSelector(selectSavingsAccounts)

  useEffect(() => {
    const newAllSavingsAccountsBalance = savingsAccounts.reduce((allSavingsAccountsBalance, { totalSavings }) => {
      return allSavingsAccountsBalance + totalSavings;
    }, 0);

    const newTotalAllContribution = savingsAccounts.reduce((newTotalAllContribution, { totalContribution }) => {
      return newTotalAllContribution + totalContribution;
    }, 0);

    const newAllInterest = savingsAccounts.reduce((allInterest, { totalInterest }) => {
      return allInterest + totalInterest;
    }, 0);

    console.log(savingsAccounts);

    dispatch(setSavingsAccountsSummary({
      currentAllSavingsAccountsBalance: newAllSavingsAccountsBalance,
      totalAllContribution: newTotalAllContribution,
      totalAllInterest: newAllInterest,
    }))
  }, [savingsAccounts, dispatch]);

  return (
    <div className="savings-acounts-container">
      <SavingsGoalCalculator></SavingsGoalCalculator>
        {
          savingsAccounts.length !== 0 && <AllSavingsSummary></AllSavingsSummary>
        }
        
        <CreateAccountForm label={ FINANCE_ITEM_TYPES.savings }></CreateAccountForm>

      <div className="savings-accounts-form-summary-container">

        <div className="savings-account-info-summary">
        </div>
      </div>
    </div>
  );
};

export default Savings;