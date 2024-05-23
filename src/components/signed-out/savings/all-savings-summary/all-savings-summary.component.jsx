import "./all-savings-summary.styles.scss";

import { useContext } from "react";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccountsSummary } from "../../../../store/signed-out/savings/savings.selector";

const AllSavingsSummary = () => {
  // const { savingsAccountsSummary } = useContext(SavingsContext);
  const savingsAccountsSummary = useSelector(selectSavingsAccountsSummary)

  return (
    <div className="all-savings-summary-container">
      <h4>{`Total Savings Balance - $${Number(savingsAccountsSummary.currentAllSavingsAccountsBalance).toFixed(2)}`}</h4>
      <h4>{`Total Contribution - $${Number(savingsAccountsSummary.totalAllContribution).toFixed(2)}`}</h4>
      <h4>{`Total Interest - $${Number(savingsAccountsSummary.totalAllInterest).toFixed(2)}`}</h4>
    </div>
  )
};

export default AllSavingsSummary;