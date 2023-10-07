import "./investment-info.styles.scss";

const InvestmentInfo = ({ financeItemInfo }) => {
  const startDate = new Date(financeItemInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const endDate = `${Number(year) + Number(financeItemInfo.afterYears)}-${month}-${day}`;

  return (
    <div className="investment-info-container">
      <h5>{`Investment name ${financeItemInfo.investmentName}`}</h5>
      <h5>{`Investment type ${financeItemInfo.investmentType}`}</h5>
      <h5>{`Return rate ${financeItemInfo.returnRate}%`}</h5>
      <h5>{`Compounded ${financeItemInfo.compounded}`}</h5>
      <h5>{`Additional contribution of $${financeItemInfo.additionalContribution}`}</h5>
      <h5>{`at the ${financeItemInfo.contributionAt} of each ${financeItemInfo.contributionInterval}`}</h5>
      <h6>{`Start date - ${financeItemInfo.startDate}`}</h6>
      <h6>{`End date - ${endDate}`}</h6>
    </div>
  );
};

export default InvestmentInfo;