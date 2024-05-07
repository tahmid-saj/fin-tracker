import React, { useContext } from "react";

import "./savings-summary.styles.scss";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphSavingsAccount from "../../savings/summary-graph/summary-graph.component";

const SavingsSummary = () => {
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <div className="savings-summary-container">
      <h2 style={{color: "black"}}><strong>Savings Summary</strong></h2>
        {
          savingsAccounts.map((account, index) => {
            return (
              <div className="savings-summary-graph-container" key={ index }>
                <FinanceTrackerItemSummary financeTrackerItemInfo={ account }
                                                financeItemType={ FINANCE_ITEM_TYPES.savings }></FinanceTrackerItemSummary>
                <SummaryGraphSavingsAccount financeItemInfo={ account }></SummaryGraphSavingsAccount>
              </div>
            )
          })
        }
    </div>
  );
};

export default SavingsSummary;
