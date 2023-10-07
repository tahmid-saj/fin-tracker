import { useState } from "react";

import { FinanceTrackerItem } from "../finance-tracker-item/finance-tracker-item.component";

import "./finance-tracker-items.styles.scss";
import CreateAccount from "../../signed-out/banking/create-account/create-account.component";
import { InvestmentTrackerItem } from "../investment-savings-tracker-item/investment-savings-tracker-item.component";

const FinanceTrackerItems = ({ label, financeTrackerItemNames, financeTrackerItemsInfo }) => {


  return (
    <div className="finance-tracker-item-container">
    
      {
        label === "Investments" || label === "Savings Accounts" ? null : <h2>{ label }</h2>
      }
      
      {
        label === "Bank Accounts" && financeTrackerItemNames !== undefined && 
        financeTrackerItemNames.map((name, index) => {
          return <FinanceTrackerItem key={ index } label={ label } name={ name }></FinanceTrackerItem>
        })  
      }
      

      {/* {
        label === "Bank Accounts" ?
        <CreateAccount></CreateAccount> : null
      } */}
    </div>
  );
};

export default FinanceTrackerItems;