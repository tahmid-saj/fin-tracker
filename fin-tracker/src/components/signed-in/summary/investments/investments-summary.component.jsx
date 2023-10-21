import React, { useContext } from "react";

import "./investments-summary.styles.scss";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const InvestmentsSummary = () => {
  const { investments } = useContext(InvestmentsContext);

  return (
    <div className="investments-summary-container">
      <h2 style={{color: "black"}}><strong>Investments Summary</strong></h2>

      {
        investments.map(investment => {
          return <FinanceTrackerItemSummary financeTrackerItemInfo={ investment }
                                            financeItemType={ FINANCE_ITEM_TYPES.investments }></FinanceTrackerItemSummary>
        })
      }
    </div>
  );
};

export default InvestmentsSummary;