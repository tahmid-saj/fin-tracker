import { useState, useContext } from "react";

import "./investment-savings-tracker-items.styles.scss";

import { InvestmentSavingsTrackerItem } from "../investment-savings-tracker-item/investment-savings-tracker-item.component";

// TODO: need to move InvestmentSavingsTrackerItems from shared to signed-in and signed-out folders
import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context";
import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import { AccordionTransition } from "../../shared/mui/accordion/accordion.component";

const InvestmentSavingsTrackerItems = ({ label }) => {

  const { investments } = useContext(InvestmentsContext);
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <div className="investment-savings-tracker-item-container">

      {
        label === FINANCE_ITEM_TYPES.investments && 
        investments.map((investmentInfo, index) => {
          return (
            <AccordionTransition header={ investmentInfo.investmentName }>
              <InvestmentSavingsTrackerItem key={ index } label={ label } 
                      financeItemInfo={ investmentInfo }></InvestmentSavingsTrackerItem>
            </AccordionTransition>
          )
        })
      }

      {
        label === FINANCE_ITEM_TYPES.savings && 
        savingsAccounts.map((savingsAccountInfo, index) => {
          return (
            <AccordionTransition header={ savingsAccountInfo.savingsAccountName }>
              <InvestmentSavingsTrackerItem key={ index } label={ label } 
                      financeItemInfo={ savingsAccountInfo }></InvestmentSavingsTrackerItem>
            </AccordionTransition>
          )
        })
      }
    </div>
  )
}

export default InvestmentSavingsTrackerItems;