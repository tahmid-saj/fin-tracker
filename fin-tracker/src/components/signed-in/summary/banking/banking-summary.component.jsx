import React, { useContext } from "react";

import "./banking-summary.styles.scss";
// import FinanceTrackerItemSummary from "../../../shared/finance-tracker-item-summary/finance-tracker-item-summary.component";
import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

const FINANCE_ITEM_TYPE = "Bank Accounts";

const BankingSummary = () => {
  const { bankingAccounts } = useContext(BankingContext);

  return (
    <div className="banking-summary-container">
      <h2 style={{color: "white"}}><strong>Bank Accounts</strong></h2>

      {
        bankingAccounts.map(account => {
          return <FinanceTrackerItemSummary financeTrackerItemInfo={ account } 
                                            financeItemType={ FINANCE_ITEM_TYPE }></FinanceTrackerItemSummary>
        })
      }
    </div>
  );
};

export default BankingSummary;