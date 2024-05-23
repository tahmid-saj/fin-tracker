import "./all-investments-summary.styles.scss";

import { useContext } from "react";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestmentsSummary } from "../../../../store/signed-out/investments/investments.selector";

const AllInvestmentsSummary = () => {
  // const { investmentsSummary } = useContext(InvestmentsContext);
  const investmentsSummary = useSelector(selectInvestmentsSummary)

  return (
    <div className="all-investments-summary-container">
      <h4>{`Total Investments Balance - $${investmentsSummary.currentAllInvestmentsBalance}`}</h4>
      <h4>{`Total Contribution - $${investmentsSummary.totalAllContribution}`}</h4>
      <h4>{`Total Interest - $${investmentsSummary.totalAllInterest}`}</h4>
    </div>
  )
};

export default AllInvestmentsSummary;