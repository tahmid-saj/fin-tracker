import React, { useState, Component, Fragment } from "react";

import "./investment-form.styles.scss";

import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component";

import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";
import SummaryGraphInvestment from "../summary-graph/summary-graph.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryTableInvestments from "../summary-table-investments/summary-table-investments.component";
import { Investment } from "../../../../store/signed-out/investments/investments.types";

const InvestmentForm = ({ financeItemInfo }: { financeItemInfo: Investment }) => {
  return (
    <Fragment>
      <SummaryGraphInvestment financeItemInfo={ financeItemInfo }></SummaryGraphInvestment>
      <SummaryTableInvestments financeItemInfo={ financeItemInfo }></SummaryTableInvestments>
      
      <div className="investments-form-summary-container">
        <UpdateInvestmentForm financeItemInfo={ financeItemInfo }></UpdateInvestmentForm>

        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.investments } 
                                  financeItemInfo={ financeItemInfo }></FinanceTrackerItemInfo>
      </div>
    </Fragment>
  )
}

export default InvestmentForm;
