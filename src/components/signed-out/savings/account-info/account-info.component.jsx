import { useContext } from "react";

import "./account-info.styles.jsx";
import { AccountInfoContainer } from "./account-info.styles.jsx";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector";
import { getSavingsAccountInfo } from "../../../../store/signed-out/savings/savings.action";
import { SAVINGS_CONTRIBUTION_INTERVALS } from "../../../../utils/constants/savings.constants";
import { Typography, Divider } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  width: COMMON_SPACING.financeItemInfo.width
}

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
    <AccountInfoContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`${savingsAccountInfo.savingsAccountName}`}</Typography>

        <br/>
        <Divider/>
        <br/>


        <Typography variant="body1">{`Monthly contribution of $${Number(savingsAccountInfo.monthlyContribution).toFixed(2)}`}</Typography> 
        <Typography variant="body1">{`a period of ${Number(savingsAccountInfo.contributionPeriod).toFixed(2)} ${savingsAccountInfo.contributionInterval}`}</Typography>
        <Typography variant="body1">{`APY ${Number(savingsAccountInfo.apy).toFixed(2)}%`}</Typography>
        
        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{`Start date - ${year}-${month < 10 ? '0' : ''}${month}-${day}`}</Typography>
        <Typography variant="body1">{`End date - ${endDate}`}</Typography>
      </SimplePaper>
    </AccountInfoContainer>
  );
};

export default AccountInfo;