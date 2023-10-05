import React from "react";

import BankAccountForm from "../banking/bank-account-form/bank-account-form.component";

import "./form-view.styles.scss";

const FormView = ({ financeItemLabel, financeItemName }) => {
  return (
    <div className="form-view-container">
      { financeItemLabel === "Bank Accounts" && <BankAccountForm financeItemName={ financeItemName }></BankAccountForm> }
    </div>
  );
}

export default FormView;