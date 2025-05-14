import "./all-investments-summary.styles.js";
import { AllInvestmentsSummaryContainer } from "./all-investments-summary.styles.js";

import { useContext } from "react";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context.js";
import SimplePaper from "../../../shared/mui/paper/paper.component.js";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllInvestmentsSummary = () => {
  const { investmentsSummary } = useContext(InvestmentsContext);

  return (
    <AllInvestmentsSummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total Investments Balance - $${investmentsSummary?.currentAllInvestmentsBalance?.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Contribution - $${investmentsSummary?.totalAllContribution?.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Interest - $${investmentsSummary?.totalAllInterest?.toFixed(2)}`}</Typography>
      </SimplePaper>
    </AllInvestmentsSummaryContainer>
  )
};

export default AllInvestmentsSummary;