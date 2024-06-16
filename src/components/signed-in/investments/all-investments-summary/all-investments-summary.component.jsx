import "./all-investments-summary.styles.scss";

import { useContext } from "react";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

const AllInvestmentsSummary = () => {
  const { investmentsSummary } = useContext(InvestmentsContext);

  return (
    <div className="all-investments-summary-container">
      <h4>{`Total Investments Balance - $${investmentsSummary.currentAllInvestmentsBalance.toFixed(2)}`}</h4>
      <h4>{`Total Contribution - $${investmentsSummary.totalAllContribution.toFixed(2)}`}</h4>
      <h4>{`Total Interest - $${investmentsSummary.totalAllInterest.toFixed(2)}`}</h4>
    </div>
  )
};

export default AllInvestmentsSummary;