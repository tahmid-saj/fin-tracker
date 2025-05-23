import { useContext } from "react";

import "./summary.styles.tsx";
import { BankAccountSummary } from "./summary.styles.tsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";
import { Typography } from "@mui/material";
import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.ts";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const Summary = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccount = bankingAccounts.find(account => account.name === financeItemInfo.name);

  return (
    <BankAccountSummary>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Current balance   `}{`$${bankingAccount?.currentBalance.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`As of ${currentDate}`}</Typography>
        <Typography variant="body1">{`IN : $${bankingAccount?.totalIn.toFixed(2)}`}</Typography>
        <Typography variant="body1">{`OUT : $${bankingAccount?.totalOut.toFixed(2)}`}</Typography>
      </SimplePaper>
    </BankAccountSummary>
  );
};

export default Summary;