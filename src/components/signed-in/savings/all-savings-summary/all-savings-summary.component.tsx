import "./all-savings-summary.styles.tsx";
import { AllSavingsSummaryContainer } from "./all-savings-summary.styles.tsx";

import { useContext } from "react";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllSavingsSummary = () => {
  const { savingsAccountsSummary } = useContext(SavingsContext);

  return (
    <AllSavingsSummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total Savings Balance - $${Number(savingsAccountsSummary?.currentAllSavingsAccountsBalance).toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Contribution - $${Number(savingsAccountsSummary?.totalAllContribution).toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Interest - $${Number(savingsAccountsSummary?.totalAllInterest).toFixed(2)}`}</Typography>
      </SimplePaper>
    </AllSavingsSummaryContainer>
  )
};

export default AllSavingsSummary;