import React, { Component, useContext } from "react";

import "./savings.styles.scss";

import CreateAccountForm from "./create-account-form/create-account-form.component";

import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
import AllSavingsSummary from "./all-savings-summary/all-savings-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import SavingsGoalCalculator from "../../shared/savings-goal-calculator/savings-goal-calculator.component";

const Savings = () => {
  const { savingsAccounts } = useContext(SavingsContext);

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