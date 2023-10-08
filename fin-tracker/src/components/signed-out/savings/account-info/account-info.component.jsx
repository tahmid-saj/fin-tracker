import "./account-info.styles.scss";

const AccountInfo = ({ financeItemInfo }) => {
  const startDate = new Date(financeItemInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  let endDate;

  if (financeItemInfo.contributionInterval === "Months") {
    if (Number(financeItemInfo.contributionPeriod) % 12 < 1) {
      endDate = `${Number(year)}-${Number(month) + Number(financeItemInfo.contributionPeriod)}-${day}`;
    } else if (Number(financeItemInfo.contributionPeriod) % 12 >= 1) {
      const remainderMonths = Number(financeItemInfo.contributionPeriod) % 12;
      const years = Math.trunc(Number(financeItemInfo.contributionPeriod) / 12);
      endDate = `${Number(year) + years}-${Number(month) + remainderMonths}-${day}`
    }
  } else if (financeItemInfo.contributionInterval === "Years") {
    endDate = `${Number(year) + Number(financeItemInfo.contributionPeriod)}-${month}-${day}`
  }

  endDate = `${Number(year) + Number(financeItemInfo.afterYears)}-${month}-${day}`;

  return (
    <div className="account-info-container">
      <h5>{`Savings account name ${financeItemInfo.savingsAccountName}`}</h5>
      <h5>{`Monthly contribution of $${financeItemInfo.monthlyContribution}`}</h5> 
      <h5>{`a period of $${financeItemInfo.contributionPeriod} ${financeItemInfo.contributionInterval}`}</h5>
      <h5>{`APY ${financeItemInfo.apy}%`}</h5>
      <h6>{`Start date - ${financeItemInfo.startDate}`}</h6>
      <h6>{`End date - ${endDate}`}</h6>
    </div>
  );
};

export default AccountInfo;