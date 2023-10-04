import React from "react";

import "./investments-summary.styles.scss";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

const InvestmentsSummary = () => {
  return (
    <div>
      <h2><strong>Investments Summary</strong></h2>
      <FinanceTrackerItemSummary financeTrackerItemName={ "GIC" }></FinanceTrackerItemSummary>
    </div>
  );
};

export default InvestmentsSummary;