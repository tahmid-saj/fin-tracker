import React from "react";

import "./banking-summary.styles.scss";
// import FinanceTrackerItemSummary from "../../../shared/finance-tracker-item-summary/finance-tracker-item-summary.component";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

const BankingSummary = () => {
  return (
    <div className="banking-summary-container">
      <h2 style={{color: "white"}}><strong>Bank Accounts</strong></h2>
      <FinanceTrackerItemSummary financeTrackerItemName={ "TD Account" }></FinanceTrackerItemSummary>
    </div>
  );
};

export default BankingSummary;