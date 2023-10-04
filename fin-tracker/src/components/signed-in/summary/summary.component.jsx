import React from "react";
import BankingSummary from "./banking/banking-summary.component";
import InvestmentsSummary from "./investments/investments-summary.component";
import SavingsSummary from "./savings/savings-summary.component";


const Summary = () => {
  return (
    <div>
      <BankingSummary></BankingSummary>
      <InvestmentsSummary></InvestmentsSummary>
      <SavingsSummary></SavingsSummary>
    </div>
  );
};

export default Summary;