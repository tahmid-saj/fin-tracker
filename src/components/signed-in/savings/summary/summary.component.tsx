import { useContext } from "react";

import "./summary.styles.tsx";
import { SummaryContainer } from "./summary.styles.tsx";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context.tsx";
import { Typography, Divider } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { SavingsAccount } from "../../../../contexts/signed-in/savings/savings.types.ts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  width: COMMON_SPACING.financeItemInfo.width
}

export const Summary = ({ financeItemInfo }: { financeItemInfo: SavingsAccount }) => {
  
  const { getSavingsAccountInfo } = useContext(SavingsContext);

  const savingsAccountInfo = getSavingsAccountInfo(financeItemInfo.savingsAccountName);

  return (
    <SummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total savings $${Number(savingsAccountInfo?.totalSavings)?.toFixed(2)}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{`Initial deposit $${Number(savingsAccountInfo?.initialDeposit)?.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total contribution $${Number(savingsAccountInfo?.totalContribution)?.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total interest $${Number(savingsAccountInfo?.totalInterest)?.toFixed(2)}`}</Typography>
      </SimplePaper>
    </SummaryContainer>
  );
};

export default Summary;