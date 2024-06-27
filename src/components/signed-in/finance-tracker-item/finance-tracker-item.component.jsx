import { Fragment, useState, useContext } from "react";

import "./finance-tracker-item.styles.scss";

// TODO: need to move FinanceTrackerItem from shared to signed-in and signed-out folders
import FormView from "../form-view/form-view.component";

import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

export let activeFormView = {
  label: "",
  name: ""
}

export const FinanceTrackerItem = ({ name, label, ...otherProps }) => {

  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccountExists = bankingAccounts.find(account => account.name === name)

  const handleDisplayFinanceTrackerItemForm = (event) => {
    

    activeFormView = {
      label: label,
      name: name
    };

    
  }

  return (
    <div>

    {
      bankingAccountExists && (
        <Fragment>
          <button className={`button-container finance-tracker-item-button`} 
                  { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
                  onClick={ e => handleDisplayFinanceTrackerItemForm(e) }>
            { `${name}` }
          </button>

          <FormView financeItemLabel={ label } financeItemInfo={ name }></FormView>

          {
            label !== "Savings Accounts" && label !== "Investments" && (
              <div className="form-view-separator-container">
                <hr className="rounded"/>
              </div>
            )
          }

        </Fragment>
        )
    }
    </div>
  );
};
