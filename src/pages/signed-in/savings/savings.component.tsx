import React, { Component, useContext } from "react";

import "./savings.styles.jsx";
import { SavingsContainer } from "./savings.styles.jsx";

import CreateAccountForm from "../../../components/signed-in/savings/create-account-form/create-account-form.component.jsx";

import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context.js";
import AllSavingsSummary from "../../../components/signed-in/savings/all-savings-summary/all-savings-summary.component.jsx";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants.js";
import SavingsGoalCalculator from "../../../components/shared/savings-goal-calculator/savings-goal-calculator.component.jsx";

import CalculateIcon from '@mui/icons-material/Calculate';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SavingsIcon from '@mui/icons-material/Savings';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx";
import SavingsList from "../../../components/signed-in/savings/savings/savings.component.jsx";

const Savings = () => {
  const { savingsAccounts } = useContext(SavingsContext);

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