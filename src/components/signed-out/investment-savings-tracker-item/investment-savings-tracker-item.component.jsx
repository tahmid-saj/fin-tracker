import React, { Fragment, useState, Component, useContext } from "react";

import "./investment-savings-tracker-item.styles.scss";

// TODO: need to move InvestmentSavingsTrackerItem from shared to signed-in and signed-out folders
import FormView from "../form-view/form-view.component";

// import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestments } from "../../../store/signed-out/investments/investments.selector";

// import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
import { selectSavingsAccounts } from "../../../store/signed-out/savings/savings.selector";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

export let activeFormView = {
  label: "",
  financeItemInfo: {}
}

export const InvestmentSavingsTrackerItem = ({ label, financeItemInfo, ...otherProps }) => {
  // const { investments } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)
    
  // const { savingsAccounts } = useContext(SavingsContext);
  const savingsAccounts = useSelector(selectSavingsAccounts)

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

