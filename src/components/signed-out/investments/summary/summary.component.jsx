import { useContext } from "react";

import "./summary.styles.scss";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector";
import { getInvestmentInfo } from "../../../../store/signed-out/investments/investments.action";

export const Summary = ({ financeItemInfo }) => {
  // const { getInvestmentInfo } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)

  const investmentInfo = getInvestmentInfo(investments, financeItemInfo.investmentName);

  return (
    <div className="summary-container">
      <h5>{`End balance $${investmentInfo.endBalance.toFixed(2)}`}</h5>
      <h5>{`Starting amount $${investmentInfo.startingAmount.toFixed(2)}`}</h5>
      <h5>{`Total contribution $${investmentInfo.totalContribution.toFixed(2)}`}</h5>
      <h5>{`Total interest $${investmentInfo.totalInterest.toFixed(2)}`}</h5>
    </div>
  );
};

// export default Summary;