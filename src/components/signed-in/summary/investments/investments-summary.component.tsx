import React, { useContext, Fragment } from "react";

import "./investments-summary.styles.tsx";
import { InvestmentSummaryContainer, InvestmentsSummaryContainer } from "./investments-summary.styles.tsx"

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context.tsx";

import FinanceSummary from "./summary-graph/finance-summary.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

const InvestmentsSummary = () => {
  const { investments } = useContext(InvestmentsContext);

  return (
    <InvestmentsSummaryContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"] }} variant="h6">Investments</Typography>
        {
          investments.map((investment, index) => {
            return (
              <InvestmentSummaryContainer key={ index }>
                {/* <FinanceTrackerItemSummary financeTrackerItemInfo={ investment }
                                                financeItemType={ FINANCE_ITEM_TYPES.investments }></FinanceTrackerItemSummary>
                <SummaryGraphInvestment financeItemInfo={ investment }></SummaryGraphInvestment> */}

                <FinanceSummary financeItemInfo={ investment }></FinanceSummary>
              </InvestmentSummaryContainer>
            )
          })
        }
    </InvestmentsSummaryContainer>
  );
};

export default InvestmentsSummary;