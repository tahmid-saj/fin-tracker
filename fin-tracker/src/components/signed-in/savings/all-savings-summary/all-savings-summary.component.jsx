import "./all-savings-summary.styles.scss";

import { useContext } from "react";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context";

const AllSavingsSummary = () => {
  const { savingsAccountsSummary } = useContext(SavingsContext);

  return (
    <div className="all-savings-summary-container">
      <h4>{`Total Savings Balance - $${Number(savingsAccountsSummary.currentAllSavingsAccountsBalance).toFixed(2)}`}</h4>
      <h4>{`Total Contribution - $${Number(savingsAccountsSummary.totalAllContribution).toFixed(2)}`}</h4>
      <h4>{`Total Interest - $${Number(savingsAccountsSummary.totalAllInterest).toFixed(2)}`}</h4>
    </div>
  )
};

export default AllSavingsSummary;