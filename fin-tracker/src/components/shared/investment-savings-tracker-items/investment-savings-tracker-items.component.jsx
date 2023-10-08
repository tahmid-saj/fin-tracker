import { useState } from "react";

import "./investment-savings-tracker-items.styles.scss";

import { InvestmentSavingsTrackerItem } from "../investment-savings-tracker-item/investment-savings-tracker-item.component";

const InvestmentSavingsTrackerItems = ({ label, financeTrackerItemNames, financeTrackerItemsInfo }) => {

  return (
    <div className="investment-savings-tracker-item-container">
      {/* {
        label === "Investments" || label === "Savings Accounts" ? <h2>{ label }</h2> : <h2>{ label }</h2>
      } */}

      {
        label === "Investments" && 
        financeTrackerItemsInfo.map((investmentInfo, index) => {
          return <InvestmentSavingsTrackerItem key={ index } label={ label } 
                  financeItemInfo={ investmentInfo }></InvestmentSavingsTrackerItem>
        })
      }

      {
        label === "Savings Accounts" && 
        financeTrackerItemsInfo.map((savingsAccountInfo, index) => {
          return <InvestmentSavingsTrackerItem key={ index } label={ label } 
                  financeItemInfo={ savingsAccountInfo }></InvestmentSavingsTrackerItem>
        })
      }
    </div>
  )
}

export default InvestmentSavingsTrackerItems;