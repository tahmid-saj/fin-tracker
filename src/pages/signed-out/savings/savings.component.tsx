import React, { Component, useEffect } from "react";

import "./savings.styles.jsx";
import { SavingsContainer } from "./savings.styles.jsx";

import CreateAccountForm from "../../../components/signed-out/savings/create-account-form/create-account-form.component.jsx";

// import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
import { useDispatch, useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../store/signed-out/savings/savings.selector.js";
import { setSavingsAccountsSummary } from "../../../store/signed-out/savings/savings.action.js";

import AllSavingsSummary from "../../../components/signed-out/savings/all-savings-summary/all-savings-summary.component.jsx";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants.js";
import SavingsGoalCalculator from "../../../components/shared/savings-goal-calculator/savings-goal-calculator.component.jsx";

import CalculateIcon from '@mui/icons-material/Calculate';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SavingsIcon from '@mui/icons-material/Savings';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx";
import SavingsList from "../../../components/signed-out/savings/savings/savings.component.jsx";

const Savings = () => {
  // const { savingsAccounts } = useContext(SavingsContext);
  const dispatch = useDispatch()
  const savingsAccounts = useSelector(selectSavingsAccounts)

  useEffect(() => {
    if (savingsAccounts) {
      const newAllSavingsAccountsBalance = savingsAccounts.reduce((allSavingsAccountsBalance, { totalSavings }) => {
        return allSavingsAccountsBalance + totalSavings;
      }, 0);
  
      const newTotalAllContribution = savingsAccounts.reduce((newTotalAllContribution, { totalContribution }) => {
        return newTotalAllContribution + totalContribution;
      }, 0);
  
      const newAllInterest = savingsAccounts.reduce((allInterest, { totalInterest }) => {
        return allInterest + totalInterest;
      }, 0);
  
      console.log(savingsAccounts);
  
      dispatch(setSavingsAccountsSummary({
        currentAllSavingsAccountsBalance: newAllSavingsAccountsBalance,
        totalAllContribution: newTotalAllContribution,
        totalAllInterest: newAllInterest,
      }))
    }
  }, [savingsAccounts, dispatch]);

  let tabList = [{
    value: "savings-calculator",
    icon: <CalculateIcon/>,
    label: "Savings Calculator"
  }]
  let panelList = [{
    value: "savings-calculator",
    children: <SavingsGoalCalculator/>
  }]

  if (savingsAccounts && savingsAccounts.length !== 0) {
    tabList.push({
      value: "summary",
      icon: <SummarizeIcon/>,
      label: "Summary"
    })
    tabList.push({
      value: "savings-accounts",
      icon: <SavingsIcon/>,
      label: "Savings Accounts"
    })

    panelList.push({
      value: "summary",
      children: <AllSavingsSummary/>
    })
    panelList.push({
      value: "savings-accounts",
      children: <SavingsList/>
    })
  }

  tabList.push({
    value: "add-account",
    icon: <AddIcon/>,
    label: "Add Account"
  })
  panelList.push({
    value: "add-account",
    children: <CreateAccountForm/>
  })

  return (
    <SavingsContainer>
      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </SavingsContainer>
  )

  // return (
  //   <div className="savings-acounts-container">
  //     <SavingsGoalCalculator></SavingsGoalCalculator>
  //       {
  //         savingsAccounts.length !== 0 && <AllSavingsSummary></AllSavingsSummary>
  //       }
        
  //       <CreateAccountForm label={ FINANCE_ITEM_TYPES.savings }></CreateAccountForm>

  //     <div className="savings-accounts-form-summary-container">

  //       <div className="savings-account-info-summary">
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Savings;