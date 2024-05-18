import { useContext } from "react";

import "./summary.styles.scss";

import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";

export const Summary = ({ financeItemInfo }) => {
  
  const { getInvestmentInfo } = useContext(InvestmentsContext);

  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);

  return (
    <div className="summary-container">
      <h5>{`End balance $${investmentInfo.endBalance}`}</h5>
      <h5>{`Starting amount $${investmentInfo.startingAmount}`}</h5>
      <h5>{`Total contribution $${investmentInfo.totalContribution}`}</h5>
      <h5>{`Total interest $${investmentInfo.totalInterest}`}</h5>
    </div>
  );
};

// export default Summary;