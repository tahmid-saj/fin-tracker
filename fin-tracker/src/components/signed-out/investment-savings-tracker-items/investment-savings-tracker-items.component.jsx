import { useState, useContext } from "react";

import "./investment-savings-tracker-items.styles.scss";

import { InvestmentSavingsTrackerItem } from "../investment-savings-tracker-item/investment-savings-tracker-item.component";

// TODO: need to move InvestmentSavingsTrackerItems from shared to signed-in and signed-out folders
import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";
import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const InvestmentSavingsTrackerItems = ({ label }) => {

  const { investments } = useContext(InvestmentsContext);
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <div className="investment-savings-tracker-item-container">

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

export default InvestmentSavingsTrackerItems;