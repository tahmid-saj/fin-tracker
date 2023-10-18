import React, { useContext } from "react";

import "./investments-summary.styles.scss";
// import FinanceTrackerItemSummary from "../../../shared/finance-tracker-item-summary/finance-tracker-item-summary.component";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

const FINANCE_ITEM_TYPE = "Investments";

const InvestmentsSummary = () => {
  const { investments } = useContext(InvestmentsContext);

  return (
    <div className="investments-summary-container">
      <h2 style={{color: "white"}}><strong>Investments Summary</strong></h2>

      {
        investments.map(investment => {
          return <FinanceTrackerItemSummary financeTrackerItemInfo={ investment }
                                            financeItemType={ FINANCE_ITEM_TYPE }></FinanceTrackerItemSummary>
        })
      }
    </div>
  );
};

export default InvestmentsSummary;