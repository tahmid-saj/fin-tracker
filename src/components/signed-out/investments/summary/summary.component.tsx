import { useContext } from "react";

import "./summary.styles.tsx";
import { SummaryContainer } from "./summary.styles.tsx";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector.ts";
import { getInvestmentInfo } from "../../../../store/signed-out/investments/investments.action.ts";
import { Typography, Divider } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { Investment } from "../../../../store/signed-out/investments/investments.types.ts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  width: COMMON_SPACING.financeItemInfo.width
}

export const Summary = ({ financeItemInfo }: { financeItemInfo: Investment }) => {
  const investments = useSelector(selectInvestments)

  const investmentInfo = getInvestmentInfo(investments!, financeItemInfo.investmentName);

  return (
    <SummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`End balance $${investmentInfo?.endBalance.toFixed(2)}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{`Starting amount $${investmentInfo?.startingAmount.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total contribution $${investmentInfo?.totalContribution.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total interest $${investmentInfo?.totalInterest.toFixed(2)}`}</Typography>
      </SimplePaper>
    </SummaryContainer>
  );
};

export default Summary;