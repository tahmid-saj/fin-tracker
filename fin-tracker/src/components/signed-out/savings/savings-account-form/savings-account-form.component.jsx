import React from "react";

import "./savings-account-form.styles.scss";

import UpdateAccountForm from "../update-account-form/update-account-form.component";

const FINANCE_ITEM_TYPE = "Investments";

const financeTrackerItemNames = [
]

const SavingsAccountForm = () => {
  return (
    <div className="savings-accounts-form-summary-container">
      <UpdateAccountForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></UpdateAccountForm>

      <div className="savings-account-info-summary">
        {/* <AccountInfo></AccountInfo>
        <Summary></Summary> */}
      </div>
    </div>
  );
};

export default SavingsAccountForm;

