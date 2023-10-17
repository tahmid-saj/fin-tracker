import "./all-investments-summary.styles.scss";

import { useContext } from "react";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

const AllInvestmentsSummary = () => {
  const { investmentsSummary } = useContext(InvestmentsContext);

  return (
    <div className="all-investments-summary-container">
      <h4>{`Total Investments Balance - ${investmentsSummary.currentAllInvestmentsBalance}`}</h4>
      <h4>{`Total Contribution - ${investmentsSummary.totalAllContribution}`}</h4>
      <h4>{`Total Interest - ${investmentsSummary.totalAllInterest}`}</h4>
    </div>
  )
};

export default AllInvestmentsSummary;