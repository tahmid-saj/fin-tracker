import { useContext } from "react";

import "./summary.styles.jsx";
import { SummaryContainer } from "./summary.styles.jsx";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector";
import { getSavingsAccountInfo } from "../../../../store/signed-out/savings/savings.action";
import { Typography, Divider } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  width: COMMON_SPACING.financeItemInfo.width
}

export const Summary = ({ financeItemInfo }) => {
  // const { getSavingsAccountInfo } = useContext(SavingsContext);
  const savingsAccounts = useSelector(selectSavingsAccounts)

  const savingsAccountInfo = getSavingsAccountInfo(savingsAccounts, financeItemInfo.savingsAccountName);

  return (
    <SummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total savings $${Number(savingsAccountInfo.totalSavings).toFixed(2)}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{`Initial deposit $${Number(savingsAccountInfo.initialDeposit).toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total contribution $${Number(savingsAccountInfo.totalContribution).toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total interest $${Number(savingsAccountInfo.totalInterest).toFixed(2)}`}</Typography>
      </SimplePaper>
    </SummaryContainer>
  );
};

export default Summary;