import React from "react";

import BankAccountForm from "../banking/bank-account-form/bank-account-form.component";

import InvestmentForm from "../investments/investment-form/investment-form.component";

import SavingsAccountForm from "../savings/savings-account-form/savings-account-form.component";

import "./form-view.styles.scss";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import ExpensesForm from "../expenses/expenses-form/expenses-form.component";

const FormView = ({ financeItemLabel, financeItemInfo}) => {
  return (
    <div>
      { financeItemLabel === FINANCE_ITEM_TYPES.expenses &&
        <ExpensesForm></ExpensesForm> }

      { financeItemLabel === FINANCE_ITEM_TYPES.banking && 
        financeItemInfo !== undefined && <BankAccountForm financeItemInfo={ financeItemInfo }></BankAccountForm> }

      { financeItemLabel === FINANCE_ITEM_TYPES.investments && 
        financeItemInfo !== undefined && <InvestmentForm financeItemInfo={ financeItemInfo }></InvestmentForm> }

      { financeItemLabel === FINANCE_ITEM_TYPES.savings && 
        financeItemInfo !== undefined && <SavingsAccountForm financeItemInfo={ financeItemInfo }></SavingsAccountForm> }
    </div>
  );
}

export default FormView;