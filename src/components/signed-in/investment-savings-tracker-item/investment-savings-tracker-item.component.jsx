import React, { Fragment, useState, Component, useContext } from "react";

import "./investment-savings-tracker-item.styles.scss";

// TODO: need to move InvestmentSavingsTrackerItem from shared to signed-in and signed-out folders
import FormView from "../form-view/form-view.component";

import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context";
import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

export let activeFormView = {
  label: "",
  financeItemInfo: {}
}

export const InvestmentSavingsTrackerItem = ({ label, financeItemInfo, ...otherProps }) => {
    
  const { investments } = useContext(InvestmentsContext);
  const { savingsAccounts } = useContext(SavingsContext);

  let financeItemExists = undefined;

  if (label === FINANCE_ITEM_TYPES.investments) {
    financeItemExists = investments.find(investment => investment.investmentName === financeItemInfo.investmentName)
  } else if (label === FINANCE_ITEM_TYPES.savings) {
    financeItemExists = savingsAccounts.find(account => account.savingsAccountName === financeItemInfo.savingsAccountName)
  }

  const handleDisplayFinanceTrackerItemForm = (event) => {

    activeFormView = {
      label: label,
      financeItemInfo: financeItemInfo,
    }
    
  };

  return (
    <div>
      {
        financeItemExists && financeItemInfo !== null && (
          <Fragment>
            <button className={`button-container investment-savings-tracker-item-button`} 
                    { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
                    onClick={ e => handleDisplayFinanceTrackerItemForm(e) }>
              { label === FINANCE_ITEM_TYPES.investments && `${financeItemInfo.investmentName}` }
              { label === FINANCE_ITEM_TYPES.savings && `${financeItemInfo.savingsAccountName}` }
            </button>

            <FormView financeItemLabel={ label } 
                      financeItemInfo={ financeItemInfo }></FormView>
                      
            <div className="form-view-separator-container">
              <hr className="rounded"/>
            </div>
          </Fragment>
        )
      }
    </div>
  )
}

