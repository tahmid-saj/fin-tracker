import React from "react";

import { FinanceTrackerItem } from "../finance-tracker-item/finance-tracker-item.component";

import "./finance-tracker-item-summary.styles.scss";
import Button from "../button/button.component";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

// TODO: need to move FinanceTrackerItemSummary from shared to signed-in folder only
const FinanceTrackerItemSummary = ({ financeTrackerItemName }) => {
  return (
    <div>
      <div className="accounts-summary-container">
        {/* <FinanceTrackerItem name={`${financeTrackerItemName}`}></FinanceTrackerItem> */}

        <Button type="button">{`${financeTrackerItemName}`}</Button>

        <h4>{`Current balance   `}<h3><strong>{`$${3840}`}</strong></h3></h4>
        <h5>{`As of ${currentDate}`}</h5>
        <h4>{`IN $${5020}  -  OUT $${1180}`}</h4>
      </div>
    </div>
  );
};

export default FinanceTrackerItemSummary;
