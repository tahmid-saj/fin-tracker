import { useContext } from "react";

import "./investment-info.styles.jsx";
import { InvestmentInfoContainer } from "./investment-info.styles.jsx";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";
import { Divider, Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  width: COMMON_SPACING.financeItemInfo.width
}

const InvestmentInfo = ({ financeItemInfo }) => {
  const { getInvestmentInfo } = useContext(InvestmentsContext);
  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);

  const startDate = new Date(investmentInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const endDate = `${Number(year) + Number(investmentInfo.afterYears)}-${month}-${day}`;

  return (
    <InvestmentInfoContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Investment name - ${investmentInfo.investmentName}`}</Typography>
        <Typography variant="body1">{`Investment type - ${investmentInfo.investmentType}`}</Typography>
        <Typography variant="body1">{`Return rate ${investmentInfo.returnRate.toFixed(2)}%`}</Typography>

        <br/>
        <Divider/>
        <br/>

        <Typography variant="subtitle2">{`Compounded ${investmentInfo.compounded}`}</Typography>
        <Typography variant="body1">{`Additional contribution of $${investmentInfo.additionalContribution.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`at the ${investmentInfo.contributionAt} of each ${investmentInfo.contributionInterval}`}</Typography>
        
        <br/>
        <Divider/>
        <br/>

        <Typography variant="body1">{`Start date - ${year}-${month < 10 ? '0' : ''}${month}-${day}`}</Typography>
        <Typography variant="body1">{`End date - ${endDate}`}</Typography>
      </SimplePaper>
    </InvestmentInfoContainer>
  );
};

export default InvestmentInfo;