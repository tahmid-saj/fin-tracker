import React, { useContext, Fragment } from "react";

import "./investments-summary.styles.jsx";
import { InvestmentSummaryContainer, InvestmentsSummaryContainer } from "./investments-summary.styles.jsx"
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component.tsx";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector.ts";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants.ts";
import SummaryGraphInvestment from "../../investments/summary-graph/summary-graph.component.tsx";
import FinanceSummary from "./summary-graph/finance-summary.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

const InvestmentsSummary = () => {
  // const { investments } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)

  return (
    <InvestmentsSummaryContainer>
      <Typography sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"] }} variant="h6">Investments</Typography>
        {
          investments?.map((investment, index) => {
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