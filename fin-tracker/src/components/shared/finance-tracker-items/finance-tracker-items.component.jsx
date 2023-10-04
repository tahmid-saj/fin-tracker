import { useState } from "react";

import FinanceTrackerItem from "../finance-tracker-item/finance-tracker-item.component";

import "./finance-tracker-items.styles.scss";
import CreateAccount from "../../signed-out/banking/create-account/create-account.component";

const FinanceTrackerItems = ({ label, financeTrackerItemNames }) => {


  return (
    <div className="finance-tracker-item-container">
      <h2>{ label }</h2>
      
      {
        financeTrackerItemNames.map((name, index) => {
          return <FinanceTrackerItem key={ index } name={ name }></FinanceTrackerItem>
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