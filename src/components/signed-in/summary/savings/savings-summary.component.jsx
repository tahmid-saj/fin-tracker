import React, { useContext } from "react";

import "./savings-summary.styles.jsx";
import { SavingsSummaryContainer, SavingsAccountSummaryContainer } from "./savings-summary.styles.jsx";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphSavingsAccount from "../../savings/summary-graph/summary-graph.component";

import FinanceSummary from "./summary-graph/finance-summary.component.jsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

const SavingsSummary = () => {
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <SavingsSummaryContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"] }} variant="h6">Savings Accounts</Typography>
        {
          savingsAccounts.map((savingsAccount, index) => {
            return (
              <SavingsAccountSummaryContainer key={ index }>
                <FinanceSummary financeItemInfo={ savingsAccount }></FinanceSummary>
              </SavingsAccountSummaryContainer>
            )
          })
        }
    </SavingsSummaryContainer>
  );
};

export default SavingsSummary;
