import { useContext, useState } from "react";

import { FinanceTrackerItem } from "../finance-tracker-item/finance-tracker-item.component";

import "./finance-tracker-items.styles.scss";

// TODO: need to move FinanceTrackerItems from shared to signed-in and signed-out folders
import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import { AccordionTransition } from "../../shared/mui/accordion/accordion.component";

const FinanceTrackerItems = ({ label }) => {
  const { bankingAccounts } = useContext(BankingContext);

  return (
    <div className="finance-tracker-item-container">
    
      {
        label === FINANCE_ITEM_TYPES.investments || label === FINANCE_ITEM_TYPES.savings ? null : <h2>{ label }</h2>
      }
      
      {
        label === FINANCE_ITEM_TYPES.banking && bankingAccounts !== undefined && bankingAccounts.length !== 0 && 
        bankingAccounts.map((account) => account.name)
          .map((name, index) => {
            return (
              <AccordionTransition header={ name }>
                <FinanceTrackerItem key={ index } label={ label } name={ name }></FinanceTrackerItem>
              </AccordionTransition>
            )
          })  
      }
    </div>
  );
};


export default FinanceTrackerItems;