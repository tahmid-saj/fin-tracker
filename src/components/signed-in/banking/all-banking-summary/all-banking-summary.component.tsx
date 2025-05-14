import "./all-banking-summary.styles.tsx";
import { AllBankingSummaryContainer } from "./all-banking-summary.styles.tsx";

import { useContext } from "react";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllBankingSummary = () => {
  const { bankingSummary } = useContext(BankingContext);

  return (
    <AllBankingSummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total Banking Balance - $${bankingSummary?.currentAllBankingBalance?.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total In - $${bankingSummary?.totalAllBankingIn?.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`Total Out - $${bankingSummary?.totalAllBankingOut?.toFixed(2)}`}</Typography>
      </SimplePaper>
    </AllBankingSummaryContainer>
  )
};

export default AllBankingSummary;