import { useContext } from "react";

import "./account-info.styles.scss";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector";
import { getSavingsAccountInfo } from "../../../../store/signed-out/savings/savings.action";

import { SAVINGS_CONTRIBUTION_INTERVALS } from "../../../../utils/constants/savings.constants";

const AccountInfo = ({ financeItemInfo }) => {
  // const { getSavingsAccountInfo } = useContext(SavingsContext);
  const savingsAccounts = useSelector(selectSavingsAccounts)

  const savingsAccountInfo = getSavingsAccountInfo(savingsAccounts, financeItemInfo.savingsAccountName);

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
      <h5>{`${savingsAccountInfo.savingsAccountName}`}</h5>
      <p>{`Monthly contribution of $${Number(savingsAccountInfo.monthlyContribution).toFixed(2)}`}</p> 
      <p>{`a period of ${Number(savingsAccountInfo.contributionPeriod).toFixed(2)} ${savingsAccountInfo.contributionInterval}`}</p>
      <p>{`APY ${Number(savingsAccountInfo.apy).toFixed(2)}%`}</p>
      <p>{`Start date - ${savingsAccountInfo.startDate}`}</p>
      <p>{`End date - ${endDate}`}</p>
    </div>
  );
};

export default AccountInfo;