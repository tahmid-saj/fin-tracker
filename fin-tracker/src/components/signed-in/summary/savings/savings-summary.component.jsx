import React, { useContext } from "react";

import "./savings-summary.styles.scss";
// import FinanceTrackerItemSummary from "../../../shared/finance-tracker-item-summary/finance-tracker-item-summary.component";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const SavingsSummary = () => {
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <div className="savings-summary-container">
      <h2 style={{color: "white"}}><strong>Savings Summary</strong></h2>

      {
        savingsAccounts.map(account => {
          return <FinanceTrackerItemSummary financeTrackerItemInfo={ account }
                                            financeItemType={ FINANCE_ITEM_TYPES.savings }></FinanceTrackerItemSummary>
        })
      }
    </div>
  );
};

export default SavingsSummary;
