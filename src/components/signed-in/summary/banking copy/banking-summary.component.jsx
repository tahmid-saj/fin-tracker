import React, { useContext, Fragment } from "react";

import "./banking-summary.styles.scss";

import FinanceTrackerItemSummary from "../../finance-tracker-item-summary/finance-tracker-item-summary.component";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";
import SummaryGraphBanking from "../../banking/summary-graph/summary-graph.component";

const BankingSummary = () => {
  const { bankingAccounts } = useContext(BankingContext);

  return (
    <div className="banking-summary-container">
      <h2 style={{color: "black"}}><strong>Bank Accounts</strong></h2>
        {
          bankingAccounts.map((account, index) => {
            return (
              <div className="banking-summary-graph-container" key={ index }>
                <FinanceTrackerItemSummary financeTrackerItemInfo={ account } 
                                                financeItemType={ FINANCE_ITEM_TYPES.banking }></FinanceTrackerItemSummary>
                <SummaryGraphBanking financeItemInfo={ account.name }></SummaryGraphBanking>
              </div>
            )
          })
        }
    </div>
  );
};

export default BankingSummary;