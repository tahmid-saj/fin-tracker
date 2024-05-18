import React, { Component, Fragment } from "react";

import "./savings-account-form.styles.scss";

import UpdateAccountForm from "../update-account-form/update-account-form.component";

import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";
import SummaryGraphSavingsAccount from "../summary-graph/summary-graph.component";
import SummaryTableSavingsAccount from "../summary-table-savings-account/summary-table-savings-account.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const SavingsAccountForm = ({ financeItemInfo }) => {

  return (
    <Fragment>
      <SummaryGraphSavingsAccount financeItemInfo={ financeItemInfo }></SummaryGraphSavingsAccount>
      <SummaryTableSavingsAccount financeItemInfo={ financeItemInfo }></SummaryTableSavingsAccount>

      <div className="savings-accounts-form-summary-container">

        <UpdateAccountForm label={ FINANCE_ITEM_TYPES.savings } 
                            financeItemInfo={ financeItemInfo }></UpdateAccountForm>

          <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.savings } 
                                  financeItemInfo={ financeItemInfo }
                                  ></FinanceTrackerItemInfo>
      </div>
    </Fragment>
  )
}

export default SavingsAccountForm;

