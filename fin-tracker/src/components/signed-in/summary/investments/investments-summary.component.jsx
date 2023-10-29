import React, { useContext, Fragment } from "react";

import "./investments-summary.styles.scss";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphInvestment from "../../investments/summary-graph/summary-graph.component";

const InvestmentsSummary = () => {
  const { investments } = useContext(InvestmentsContext);

  return (
    <div className="investments-summary-container">
      <h2 style={{color: "black"}}><strong>Investments Summary</strong></h2>
        {
          investments.map((investment, index) => {
            return (
              <div className="investments-summary-graph-container">
                <FinanceTrackerItemSummary key={ index } financeTrackerItemInfo={ investment }
                                                financeItemType={ FINANCE_ITEM_TYPES.investments }></FinanceTrackerItemSummary>
                <SummaryGraphInvestment financeItemInfo={ investment }></SummaryGraphInvestment>
              </div>
            )
          })
        }
    </div>
  );
};

export default InvestmentsSummary;