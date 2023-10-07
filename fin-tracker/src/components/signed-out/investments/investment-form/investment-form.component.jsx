import React from "react";

import "./investment-form.styles.scss";

import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component";
import InvestmentInfo from "../investment-info/investment-info.component";
import Summary from "../summary/summary.component";

const FINANCE_ITEM_TYPE = "Investments";

const financeTrackerItemNames = [
]

const InvestmentForm = ({ financeItemInfo, closeAccountHandler }) => {
  return (
    <div className="investments-form-summary-container">
      <UpdateInvestmentForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }
                            closeAccountHandler={ closeAccountHandler }></UpdateInvestmentForm>

      <div className="investment-info-summary">
        <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
        <Summary financeItemInfo={ financeItemInfo }></Summary>
      </div>
    </div>
  )
};

export default InvestmentForm;
