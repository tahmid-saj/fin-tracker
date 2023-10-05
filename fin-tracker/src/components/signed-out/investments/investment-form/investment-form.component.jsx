import React from "react";

import "./investment-form.styles.scss";

import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component";
import InvestmentInfo from "../investment-info/investment-info.component";
import Summary from "../summary/summary.component";

const FINANCE_ITEM_TYPE = "Investments";

const financeTrackerItemNames = [
]

const InvestmentForm = () => {
  return (
    <div className="investments-form-summary-container">
      <UpdateInvestmentForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></UpdateInvestmentForm>

      <div className="investment-info-summary">
        <InvestmentInfo></InvestmentInfo>
        <Summary></Summary>
      </div>
    </div>
  )
};

export default InvestmentForm;
