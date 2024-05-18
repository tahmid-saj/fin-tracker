import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./finance-tracker-item-summary.styles.scss";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

// TODO: need to move FinanceTrackerItemSummary from shared to signed-in folder only
const FinanceTrackerItemSummary = ({ financeTrackerItemInfo, financeItemType }) => {
  const navigate = useNavigate();

  const handleAccountClick = (event) => {
    event.preventDefault();

    if (financeItemType === FINANCE_ITEM_TYPES.banking) {
      navigate("/banking-signed-in")
    } else if (financeItemType === FINANCE_ITEM_TYPES.investments) {
      navigate("/investments-signed-in")
    } else if (financeItemType === FINANCE_ITEM_TYPES.savings) {
      navigate("/savings-signed-in")
    }
  };

  return (
    <div>
      <div className="accounts-summary-container">
        <button className="dashboard-accounts-button" type="button" onClick={ handleAccountClick }>{`${
          
          financeItemType === FINANCE_ITEM_TYPES.banking ? financeTrackerItemInfo.name : (
            financeItemType === FINANCE_ITEM_TYPES.investments ? financeTrackerItemInfo.investmentName : financeTrackerItemInfo.savingsAccountName
          )
          
          }`}</button>
          {
            financeItemType === FINANCE_ITEM_TYPES.banking &&
            <Fragment>
              <h4>{`Current balance : `}{`$${financeTrackerItemInfo.currentBalance}`}</h4>
              <h5>{`As of ${currentDate}`}</h5>
              <h4>{`IN : $${financeTrackerItemInfo.totalIn}  -  OUT : $${financeTrackerItemInfo.totalOut}`}</h4>
            </Fragment>
          }
          {
            financeItemType === FINANCE_ITEM_TYPES.investments &&
            <Fragment>
              <h4>{`Ending balance : `}{`$${financeTrackerItemInfo.endBalance}`}</h4>
              <h5>{`As of ${currentDate}`}</h5>
              <h4>{`Total contribution : $${financeTrackerItemInfo.totalContribution}  -  Total interest : $${financeTrackerItemInfo.totalInterest}`}</h4>
            </Fragment>
          }
          {
            financeItemType === FINANCE_ITEM_TYPES.savings &&
            <Fragment>
              <h4>{`Total savings : `}{`$${financeTrackerItemInfo.totalSavings}`}</h4>
              <h5>{`As of ${currentDate}`}</h5>
              <h4>{`Total contribution : $${financeTrackerItemInfo.totalContribution}  -  Total interest : $${financeTrackerItemInfo.totalInterest}`}</h4>
            </Fragment>
          }
      </div>
    </div>
  );
};

export default FinanceTrackerItemSummary;
