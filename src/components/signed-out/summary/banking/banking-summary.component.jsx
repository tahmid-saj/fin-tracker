import React, { useContext, Fragment } from "react";

import "./banking-summary.styles.jsx";
import { BankingSummaryContainer, BankingAccountSummaryContainer } from "./banking-summary.styles.jsx";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";

import { COLOR_CODES, FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphBanking from "../../banking/summary-graph/summary-graph.component";
import { Typography } from "@mui/material";
import FinanceSummary from "./summary-graph/finance-summary.component.jsx";

const BankingSummary = () => {
  // const { bankingAccounts } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)

  return (
    <BankingSummaryContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"] }} variant="h6">Bank Accounts</Typography>
        {
          bankingAccounts.map((account, index) => {
            return (
              <BankingAccountSummaryContainer key={ index }>
                {/* <FinanceTrackerItemSummary financeTrackerItemInfo={ account } 
                  financeItemType={ FINANCE_ITEM_TYPES.banking }></FinanceTrackerItemSummary>
                <SummaryGraphBanking financeItemInfo={ account.name }></SummaryGraphBanking> */}

                <FinanceSummary financeItemInfo={ account }></FinanceSummary>
              </BankingAccountSummaryContainer>
            )
          })
        }
    </BankingSummaryContainer>
  );
};

export default BankingSummary;