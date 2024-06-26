import "./all-banking-summary.styles.jsx";
import { AllBankingSummaryContainer } from "./all-banking-summary.styles.jsx";

import { useContext } from "react";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingSummary } from "../../../../store/signed-out/banking/banking.selector";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const AllBankingSummary = () => {
  const bankingSummary = useSelector(selectBankingSummary);

  return (
    <AllBankingSummaryContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Total Banking Balance - $${bankingSummary.currentAllBankingBalance}`}</Typography>
        <Typography variant="body1">{`Total In - $${bankingSummary.totalAllBankingIn}`}</Typography>
        <Typography variant="body1">{`Total Out - $${bankingSummary.totalAllBankingOut}`}</Typography>
      </SimplePaper>
    </AllBankingSummaryContainer>
  )
};

export default AllBankingSummary;