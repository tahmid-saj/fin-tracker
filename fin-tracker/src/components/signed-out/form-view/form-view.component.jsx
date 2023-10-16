import React from "react";

import BankAccountForm from "../banking/bank-account-form/bank-account-form.component";

import InvestmentForm from "../investments/investment-form/investment-form.component";

import SavingsAccountForm from "../savings/savings-account-form/savings-account-form.component";

import "./form-view.styles.scss";

const FormView = ({ financeItemLabel, financeItemInfo, closeAccountHandler, handleTrackerItemNameChange }) => {
  return (
    <div className="form-view-container">
      { financeItemLabel === "Bank Accounts" && 
        <BankAccountForm financeItemInfo={ financeItemInfo } 
                        closeAccountHandler={ closeAccountHandler }></BankAccountForm> }

      { financeItemLabel === "Investments" && 
        financeItemInfo !== undefined && <InvestmentForm financeItemInfo={ financeItemInfo } 
        closeAccountHandler={ closeAccountHandler }
        handleTrackerItemNameChange={ handleTrackerItemNameChange }></InvestmentForm> }

      { financeItemLabel === "Savings Accounts" && 
        financeItemInfo !== undefined && <SavingsAccountForm financeItemInfo={ financeItemInfo }
        closeAccountHandler={ closeAccountHandler }
        handleTrackerItemNameChange={ handleTrackerItemNameChange }></SavingsAccountForm> }
    </div>
  );
}

export default FormView;