import React from "react";
import BankingSummary from "./banking/banking-summary.component";
import InvestmentsSummary from "./investments/investments-summary.component";
import SavingsSummary from "./savings/savings-summary.component";

import "./summary.styles.scss";

const Summary = () => {
  return (
    <div className="accounts-summary-dashboard-container">
      <BankingSummary></BankingSummary>
      <InvestmentsSummary></InvestmentsSummary>
      <SavingsSummary></SavingsSummary>
    </div>
  );
};

export default Summary;