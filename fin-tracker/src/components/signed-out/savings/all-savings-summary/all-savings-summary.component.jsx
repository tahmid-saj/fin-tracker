import "./all-savings-summary.styles.scss";

import { useContext } from "react";

import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";

const AllSavingsSummary = () => {
  const { savingsAccountsSummary } = useContext(SavingsContext);

  return (
    <div className="all-savings-summary-container">
      <h4>{`Total Savings Balance - ${savingsAccountsSummary.currentAllSavingsAccountsBalance}`}</h4>
      <h4>{`Total Contribution - ${savingsAccountsSummary.totalAllContribution}`}</h4>
      <h4>{`Total Interest - ${savingsAccountsSummary.totalAllInterest}`}</h4>
    </div>
  )
};

export default AllSavingsSummary;