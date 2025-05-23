import "./all-investments-summary.styles.tsx";
import { AllInvestmentsSummaryContainer } from "./all-investments-summary.styles.tsx";

import { useContext } from "react";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestmentsSummary } from "../../../../store/signed-out/investments/investments.selector.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllInvestmentsSummary = () => {
  // const { investmentsSummary } = useContext(InvestmentsContext);
  const investmentsSummary = useSelector(selectInvestmentsSummary)

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