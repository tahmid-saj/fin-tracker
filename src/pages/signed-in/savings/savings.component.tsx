import React, { Component, useContext } from "react";

import "./savings.styles.tsx";
import { SavingsContainer } from "./savings.styles.tsx";

import CreateAccountForm from "../../../components/signed-in/savings/create-account-form/create-account-form.component.tsx";

import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context.ts";
import AllSavingsSummary from "../../../components/signed-in/savings/all-savings-summary/all-savings-summary.component.tsx";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants.ts";
import SavingsGoalCalculator from "../../../components/shared/savings-goal-calculator/savings-goal-calculator.component.tsx";

import CalculateIcon from '@mui/icons-material/Calculate';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SavingsIcon from '@mui/icons-material/Savings';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.tsx";
import SavingsList from "../../../components/signed-in/savings/savings/savings.component.tsx";

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