import { useState } from "react";

import "./investment-tracker-items.styles.scss";

import { InvestmentTrackerItem } from "../investment-tracker-item/investment-tracker-item.component";

const InvestmentTrackerItems = ({ label, financeTrackerItemNames, financeTrackerItemsInfo }) => {

  return (
    <div className="investment-tracker-item-container">
      {/* {
        label === "Investments" || label === "Savings Accounts" ? <h2>{ label }</h2> : <h2>{ label }</h2>
      } */}

      {
        label === "Investments" && 
        financeTrackerItemsInfo.map((investmentInfo, index) => {
          return <InvestmentTrackerItem key={ index } label={ label } 
                  investmentInfo={ investmentInfo }></InvestmentTrackerItem>
        })
      }
    </div>
  )
}

export default InvestmentTrackerItems;