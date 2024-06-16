import React, { useState, Component, Fragment } from "react";

import "./investment-form.styles.scss";

import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component";

import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";
import SummaryGraphInvestment from "../summary-graph/summary-graph.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryTableInvestments from "../summary-table-investments/summary-table-investments.component";

const InvestmentForm = ({ financeItemInfo }) => {
  return (
    <Fragment>
      <SummaryGraphInvestment financeItemInfo={ financeItemInfo }></SummaryGraphInvestment>
      <SummaryTableInvestments financeItemInfo={ financeItemInfo }></SummaryTableInvestments>
      
      <div className="investments-form-summary-container">
        <UpdateInvestmentForm label={ FINANCE_ITEM_TYPES.investments } 
                                financeItemInfo={ financeItemInfo }></UpdateInvestmentForm>

        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.investments } 
                                  financeItemInfo={ financeItemInfo }></FinanceTrackerItemInfo>
      </div>
    </Fragment>
  )
}

export default InvestmentForm;
