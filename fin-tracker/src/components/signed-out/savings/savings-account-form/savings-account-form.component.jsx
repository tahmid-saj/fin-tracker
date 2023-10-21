import React, { Component } from "react";

import "./savings-account-form.styles.scss";

import UpdateAccountForm from "../update-account-form/update-account-form.component";

import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const SavingsAccountForm = ({ financeItemInfo }) => {

  return (
    <div className="savings-accounts-form-summary-container">

      <UpdateAccountForm label={ FINANCE_ITEM_TYPES.savings } 
                          financeItemInfo={ financeItemInfo }></UpdateAccountForm>

        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.savings } 
                                financeItemInfo={ financeItemInfo }
                                ></FinanceTrackerItemInfo>
    </div>
  )
}

export default SavingsAccountForm;

