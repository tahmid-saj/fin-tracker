import { useState } from "react";

import Button from "../button/button.component";
import FinanceTrackerItem from "../finance-tracker-item/finance-tracker-item.component";
import FormInput from "../form-input/form-input.component";

import "./finance-tracker-items.styles.scss";
import CreateAccount from "../banking/create-account/create-account.component";

const FinanceTrackerItems = ({ children, label }) => {


  return (
    <div className="finance-tracker-item-container">
      <h2>{ label }</h2>
      <FinanceTrackerItem name={ "TD Account" }></FinanceTrackerItem>
      <CreateAccount></CreateAccount>
    </div>
  );
};

export default FinanceTrackerItems;