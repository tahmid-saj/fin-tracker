import React, { Component } from "react";
import FinanceTrackerItems from "../../shared/finance-tracker-items/finance-tracker-items.component";

import "./savings.styles.scss";
import UpdateAccountForm from "./update-account-form/update-account-form.component";
import AccountInfo from "./account-info/account-info.component";
import Summary from "./summary/summary.component";

const FINANCE_ITEM_TYPE = "Savings Accounts";

const financeTrackerItemNames = [
  "EQ Bank"
]

const Savings = () => {
  return (
    <div className="savings-acounts-container">
      <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems>

      <div className="savings-accounts-form-summary-container">
        <UpdateAccountForm></UpdateAccountForm>

        <div className="savings-account-info-summary">
          <AccountInfo></AccountInfo>
          <Summary></Summary>
        </div>
      </div>
    </div>
  );
};

export default Savings;