import React from "react";

import BankAccountForm from "../banking/bank-account-form/bank-account-form.component";

import InvestmentForm from "../investments/investment-form/investment-form.component";

import SavingsAccountForm from "../savings/savings-account-form/savings-account-form.component";

import "./form-view.styles.scss";

const FormView = ({ financeItemLabel, financeItemName, closeAccountHandler }) => {
  return (
    <div className="form-view-container">
      { financeItemLabel === "Bank Accounts" && <BankAccountForm financeItemName={ financeItemName }
                                                                  closeAccountHandler={ closeAccountHandler }></BankAccountForm> }
      { financeItemLabel === "Investments" && <InvestmentForm></InvestmentForm> }
      { financeItemLabel === "Savings Accounts" && <SavingsAccountForm></SavingsAccountForm> }
    </div>
  );
}

export default FormView;