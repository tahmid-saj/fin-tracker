import { useContext } from "react";

import "./investment-info.styles.scss";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

const InvestmentInfo = ({ financeItemInfo }) => {
  const { getInvestmentInfo } = useContext(InvestmentsContext);
  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);

  const startDate = new Date(investmentInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const endDate = `${Number(year) + Number(investmentInfo.afterYears)}-${month}-${day}`;

  return (
    <div className="investment-info-container">
      <h5>{`Investment name ${investmentInfo.investmentName}`}</h5>
      <h5>{`Investment type ${investmentInfo.investmentType}`}</h5>
      <h5>{`Return rate ${investmentInfo.returnRate.toFixed(2)}%`}</h5>
      <h5>{`Compounded ${investmentInfo.compounded}`}</h5>
      <h5>{`Additional contribution of $${investmentInfo.additionalContribution.toFixed(2)}`}</h5>
      <h5>{`at the ${investmentInfo.contributionAt} of each ${investmentInfo.contributionInterval}`}</h5>
      <h6>{`Start date - ${investmentInfo.startDate}`}</h6>
      <h6>{`End date - ${endDate}`}</h6>
    </div>
  );
};

export default InvestmentInfo;