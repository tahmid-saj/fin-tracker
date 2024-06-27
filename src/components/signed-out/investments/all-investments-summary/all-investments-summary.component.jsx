import "./all-investments-summary.styles.jsx";
import { AllInvestmentsSummaryContainer } from "./all-investments-summary.styles.jsx";

import { useContext } from "react";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestmentsSummary } from "../../../../store/signed-out/investments/investments.selector";
import SimplePaper from "../../../shared/mui/paper/paper.component";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllInvestmentsSummary = () => {
  // const { investmentsSummary } = useContext(InvestmentsContext);
  const investmentsSummary = useSelector(selectInvestmentsSummary)

  return (
    <AllInvestmentsSummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total Investments Balance - $${investmentsSummary.currentAllInvestmentsBalance.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Contribution - $${investmentsSummary.totalAllContribution.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Interest - $${investmentsSummary.totalAllInterest.toFixed(2)}`}</Typography>
      </SimplePaper>
    </AllInvestmentsSummaryContainer>
  )
};

export default AllInvestmentsSummary;