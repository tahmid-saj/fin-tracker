import "./all-savings-summary.styles.jsx";
import { AllSavingsSummaryContainer } from "./all-savings-summary.styles.jsx";

import { useContext } from "react";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccountsSummary } from "../../../../store/signed-out/savings/savings.selector";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllSavingsSummary = () => {
  // const { savingsAccountsSummary } = useContext(SavingsContext);
  const savingsAccountsSummary = useSelector(selectSavingsAccountsSummary)

  return (
    <AllSavingsSummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total Savings Balance - $${Number(savingsAccountsSummary.currentAllSavingsAccountsBalance).toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Contribution - $${Number(savingsAccountsSummary.totalAllContribution).toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Interest - $${Number(savingsAccountsSummary.totalAllInterest).toFixed(2)}`}</Typography>
      </SimplePaper>
    </AllSavingsSummaryContainer>
  )
};

export default AllSavingsSummary;