import { useState, useContext } from "react";

import "./investment-savings-tracker-items.styles.scss";

import { InvestmentSavingsTrackerItem } from "../investment-savings-tracker-item/investment-savings-tracker-item.component";

// TODO: need to move InvestmentSavingsTrackerItems from shared to signed-in and signed-out folders
import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context";
import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const InvestmentSavingsTrackerItems = ({ label, 
  // financeTrackerItemNames, 
  // financeTrackerItemsInfo 
}) => {

  const { investments } = useContext(InvestmentsContext);
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <div className="investment-savings-tracker-item-container">
      {/* {
        label === "Investments" || label === "Savings Accounts" ? <h2>{ label }</h2> : <h2>{ label }</h2>
      } */}

      {
        label === FINANCE_ITEM_TYPES.investments && 
        investments.map((investmentInfo, index) => {
          return <InvestmentSavingsTrackerItem key={ index } label={ label } 
                  financeItemInfo={ investmentInfo }></InvestmentSavingsTrackerItem>
        })
      }

      {
        label === FINANCE_ITEM_TYPES.savings && 
        savingsAccounts.map((savingsAccountInfo, index) => {
          return <InvestmentSavingsTrackerItem key={ index } label={ label } 
                  financeItemInfo={ savingsAccountInfo }></InvestmentSavingsTrackerItem>
        })
      }
    </div>
  )
}

const InvestmentSavingsTrackerItems2 = ({ label, financeTrackerItemNames, financeTrackerItemsInfo }) => {

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
};

export default InvestmentSavingsTrackerItems;