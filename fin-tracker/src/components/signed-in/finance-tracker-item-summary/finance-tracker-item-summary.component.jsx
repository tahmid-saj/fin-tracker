import React, { Fragment } from "react";

// import { FinanceTrackerItem } from "../finance-tracker-item/finance-tracker-item.component";

import "./finance-tracker-item-summary.styles.scss";
import Button from "../../shared/button/button.component";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const FINANCE_ITEM_TYPES = {
  banking: "Bank Accounts",
  investments: "Investments",
  savings: "Savings Accounts"
};

// TODO: need to move FinanceTrackerItemSummary from shared to signed-in folder only
const FinanceTrackerItemSummary = ({ financeTrackerItemInfo, financeItemType }) => {
  return (
    <div>
      <div className="accounts-summary-container">
        {/* <FinanceTrackerItem name={`${financeTrackerItemName}`}></FinanceTrackerItem> */}

        <Button type="button">{`${
          
          financeItemType === FINANCE_ITEM_TYPES.banking ? financeTrackerItemInfo.name : (
            financeItemType === FINANCE_ITEM_TYPES.investments ? financeTrackerItemInfo.investmentName : financeTrackerItemInfo.savingsAccountName
          )
          
          }`}</Button>
          {
            financeItemType === FINANCE_ITEM_TYPES.banking &&
            <Fragment>
              <h4>{`Current balance   `}<h3><strong>{`$${financeTrackerItemInfo.currentBalance}`}</strong></h3></h4>
              <h5>{`As of ${currentDate}`}</h5>
              <h4>{`IN $${financeTrackerItemInfo.totalIn}  -  OUT $${financeTrackerItemInfo.totalOut}`}</h4>
            </Fragment>
          }
          {
            financeItemType === FINANCE_ITEM_TYPES.investments &&
            <Fragment>
              <h4>{`Ending balance   `}<h3><strong>{`$${financeTrackerItemInfo.endBalance}`}</strong></h3></h4>
              <h5>{`As of ${currentDate}`}</h5>
              <h4>{`Total contribution $${financeTrackerItemInfo.totalContribution}  -  Total interest $${financeTrackerItemInfo.totalInterest}`}</h4>
            </Fragment>
          }
          {
            financeItemType === FINANCE_ITEM_TYPES.savings &&
            <Fragment>
              <h4>{`Total savings   `}<h3><strong>{`$${financeTrackerItemInfo.totalSavings}`}</strong></h3></h4>
              <h5>{`As of ${currentDate}`}</h5>
              <h4>{`Total contribution $${financeTrackerItemInfo.totalContribution}  -  Total interest $${financeTrackerItemInfo.totalInterest}`}</h4>
            </Fragment>
          }
      </div>
    </div>
  );
};

export default FinanceTrackerItemSummary;
