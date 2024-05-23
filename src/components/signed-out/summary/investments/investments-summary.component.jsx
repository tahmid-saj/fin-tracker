import React, { useContext, Fragment } from "react";

import "./investments-summary.styles.scss";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphInvestment from "../../investments/summary-graph/summary-graph.component";

const InvestmentsSummary = () => {
  // const { investments } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)

  return (
    <div className="investments-summary-container">
      <h2 style={{color: "black"}}><strong>Investments</strong></h2>
        {
          investments.map((investment, index) => {
            return (
              <div className="investments-summary-graph-container" key={ index }>
                <FinanceTrackerItemSummary financeTrackerItemInfo={ investment }
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