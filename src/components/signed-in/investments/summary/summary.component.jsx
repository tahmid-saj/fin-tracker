import { useContext } from "react";

import "./summary.styles.scss";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

export const Summary = ({ financeItemInfo }) => {
  
  const { getInvestmentInfo } = useContext(InvestmentsContext);

  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);

  return (
    <div className="summary-container">
      <h5>{`End balance $${investmentInfo.endBalance.toFixed(2)}`}</h5>
      <h5>{`Starting amount $${investmentInfo.startingAmount.toFixed(2)}`}</h5>
      <h5>{`Total contribution $${investmentInfo.totalContribution.toFixed(2)}`}</h5>
      <h5>{`Total interest $${investmentInfo.totalInterest.toFixed(2)}`}</h5>
    </div>
  );
};
