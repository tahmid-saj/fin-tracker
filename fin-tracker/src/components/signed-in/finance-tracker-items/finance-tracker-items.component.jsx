import { useContext, useState } from "react";

import { FinanceTrackerItem } from "../finance-tracker-item/finance-tracker-item.component";

import "./finance-tracker-items.styles.scss";
// import CreateAccount from "../banking/create-account/create-account.component";
// import { InvestmentTrackerItem } from "../investment-savings-tracker-item/investment-savings-tracker-item.component";

// TODO: need to move FinanceTrackerItems from shared to signed-in and signed-out folders
import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";

const FinanceTrackerItems = ({ label }) => {
  const { bankingAccounts } = useContext(BankingContext);

  return (
    <div className="finance-tracker-item-container">
    
      {
        label === "Investments" || label === "Savings Accounts" ? null : <h2>{ label }</h2>
      }
      
      {
        label === "Bank Accounts" && bankingAccounts !== undefined && bankingAccounts.length !== 0 && 
        bankingAccounts.map((account) => account.name)
          .map((name, index) => {
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

const FinanceTrackerItems2 = ({ label, financeTrackerItemNames, financeTrackerItemsInfo }) => {
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