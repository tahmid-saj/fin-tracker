import React from "react";

import "./investments-summary.styles.scss";
// import FinanceTrackerItemSummary from "../../../shared/finance-tracker-item-summary/finance-tracker-item-summary.component";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

const InvestmentsSummary = () => {
  return (
    <div className="investments-summary-container">
      <h2 style={{color: "white"}}><strong>Investments Summary</strong></h2>
      <FinanceTrackerItemSummary financeTrackerItemName={ "GIC" }></FinanceTrackerItemSummary>
    </div>
  );
};

export default InvestmentsSummary;