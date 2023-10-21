import React, { useState, Component } from "react";

import "./investment-form.styles.scss";

import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component";

import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const InvestmentForm = ({ financeItemInfo }) => {

    return (
    <div className="investments-form-summary-container">

      <UpdateInvestmentForm label={ FINANCE_ITEM_TYPES.investments } 
                            financeItemInfo={ financeItemInfo }></UpdateInvestmentForm>

      <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.investments } 
                                financeItemInfo={ financeItemInfo }></FinanceTrackerItemInfo>
    </div>
  )
}

export default InvestmentForm;
