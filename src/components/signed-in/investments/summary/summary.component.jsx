import { useContext } from "react";

import "./summary.styles.jsx";
import { SummaryContainer } from "./summary.styles.jsx";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";
import { Typography, Divider } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  width: COMMON_SPACING.financeItemInfo.width
}
 
const Summary = ({ financeItemInfo }) => {
  
  const { getInvestmentInfo } = useContext(InvestmentsContext);

  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);

  return (
    <SummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`End balance $${investmentInfo.endBalance.toFixed(2)}`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{`Starting amount $${investmentInfo.startingAmount.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total contribution $${investmentInfo.totalContribution.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total interest $${investmentInfo.totalInterest.toFixed(2)}`}</Typography>
      </SimplePaper>
    </SummaryContainer>
  );
};


export default Summary