import { Typography } from "@mui/material";
import "./summary-info.styles"
import { InfoContainer } from "./summary-info.styles"
import Button from "../../../../shared/button/button.component";
import { BankingAccount } from "../../../../../contexts/signed-in/banking/banking.types";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const SummaryInfo = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  return (
    <InfoContainer>
      <Typography variant="h6">{`Current balance : `}{`$${financeItemInfo.currentBalance.toFixed(2)}`}</Typography>
      <Typography variant="body1">{`As of ${currentDate}`}</Typography>
      <Typography variant="body1">{`IN : $${financeItemInfo.totalIn.toFixed(2)}`}</Typography>
      <Typography variant="body1">{`OUT : $${financeItemInfo.totalOut.toFixed(2)}`}</Typography>
    </InfoContainer>
  )
}

export default SummaryInfo