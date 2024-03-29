import { useContext } from "react";

import "./account-info.styles.scss";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context";

import { SAVINGS_CONTRIBUTION_INTERVALS } from "../../../../utils/constants/savings.constants";

const AccountInfo = ({ financeItemInfo }) => {
  const { getSavingsAccountInfo } = useContext(SavingsContext);
  const savingsAccountInfo = getSavingsAccountInfo(financeItemInfo.savingsAccountName);

  const startDate = new Date(savingsAccountInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  let endDate;

  if (savingsAccountInfo.contributionInterval === SAVINGS_CONTRIBUTION_INTERVALS.months) {
    if (Number(savingsAccountInfo.contributionPeriod) % 12 < 1) {
      endDate = `${Number(year)}-${Number(month) + Number(savingsAccountInfo.contributionPeriod)}-${day}`;
    } else if (Number(savingsAccountInfo.contributionPeriod) % 12 >= 1) {
      const remainderMonths = Number(savingsAccountInfo.contributionPeriod) % 12;
      const years = Math.trunc(Number(savingsAccountInfo.contributionPeriod) / 12);
      endDate = `${Number(year) + years}-${Number(month) + remainderMonths}-${day}`
    }
  } else if (savingsAccountInfo.contributionInterval === SAVINGS_CONTRIBUTION_INTERVALS.years) {
    endDate = `${Number(year) + Number(savingsAccountInfo.contributionPeriod)}-${month}-${day}`
  }

  return (
    <div className="account-info-container">
      <h5>{`Savings account name ${savingsAccountInfo.savingsAccountName}`}</h5>
      <h5>{`Monthly contribution of $${savingsAccountInfo.monthlyContribution}`}</h5> 
      <h5>{`a period of $${savingsAccountInfo.contributionPeriod} ${savingsAccountInfo.contributionInterval}`}</h5>
      <h5>{`APY ${savingsAccountInfo.apy}%`}</h5>
      <h6>{`Start date - ${savingsAccountInfo.startDate}`}</h6>
      <h6>{`End date - ${endDate}`}</h6>
    </div>
  );
};

export default AccountInfo;