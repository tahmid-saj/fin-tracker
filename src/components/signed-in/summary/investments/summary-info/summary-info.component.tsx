import { Typography } from "@mui/material";
import "./summary-info.styles"
import { InfoContainer } from "./summary-info.styles"
import Button from "../../../../shared/button/button.component";
import { Investment } from "../../../../../contexts/signed-in/investments/investments.types";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const SummaryInfo = ({ financeItemInfo }: { financeItemInfo: Investment }) => {
  return (
    <InfoContainer>
      <Typography variant="h6">{`Ending balance : `}{`$${financeItemInfo.endBalance.toFixed(2)}`}</Typography>
      <Typography variant="body1">{`As of ${currentDate}`}</Typography>
      <Typography variant="body1">{`Total contribution : $${financeItemInfo.totalContribution.toFixed(2)}`}</Typography>
      <Typography variant="body1">{`Total interest : $${financeItemInfo.totalInterest.toFixed(2)}`}</Typography>
    </InfoContainer>
  )
}

export default SummaryInfo