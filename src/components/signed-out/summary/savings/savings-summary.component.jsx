import React, { useContext } from "react";

import "./savings-summary.styles.scss";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphSavingsAccount from "../../savings/summary-graph/summary-graph.component";

const SavingsSummary = () => {
  // const { savingsAccounts } = useContext(SavingsContext);
  const savingsAccounts = useSelector(selectSavingsAccounts)

  return (
    <div className="savings-summary-container">
      <h2 style={{color: "black"}}><strong>Savings</strong></h2>
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
