import React from "react";

import "./savings-summary.styles.scss";
// import FinanceTrackerItemSummary from "../../../shared/finance-tracker-item-summary/finance-tracker-item-summary.component";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

const SavingsSummary = () => {
  return (
    <div className="savings-summary-container">
      <h2 style={{color: "white"}}><strong>Savings Summary</strong></h2>
      <FinanceTrackerItemSummary financeTrackerItemName={ "EQ Bank" }></FinanceTrackerItemSummary>
    </div>
  );
};

export default SavingsSummary;
