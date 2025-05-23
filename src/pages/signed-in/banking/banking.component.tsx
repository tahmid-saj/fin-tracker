import React, { Component, useContext, useEffect } from "react";

import BankAccounts from "../../../components/signed-in/banking/bank-accounts/bank-accounts.component.tsx";

import "./banking.styles.tsx";
import { BankingContainer } from "./banking.styles.tsx";

import { BankingContext } from "../../../contexts/signed-in/banking/banking.context.tsx";
import AllBankingSummary from "../../../components/signed-in/banking/all-banking-summary/all-banking-summary.component.tsx";

import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AddIcon from '@mui/icons-material/Add';
import CreateAccount from "../../../components/signed-in/banking/create-account/create-account.component.tsx";
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.tsx";


const Banking = () => {
  const { bankingAccounts } = useContext(BankingContext);

  let tabList = []
  let panelList = []

  if (bankingAccounts && bankingAccounts.length !== 0) {
    tabList.push({
      value: "summary",
      icon: <SummarizeIcon/>,
      label: "Summary"
    })
    tabList.push({
      value: "bank-accounts",
      icon: <AccountBalanceIcon/>,
      label: "Bank Accounts"
    })

    panelList.push({
      value: "summary",
      children: <AllBankingSummary/>
    })
    panelList.push({
      value: "bank-accounts",
      children: <BankAccounts/>
    })
  }

  tabList.push({
    value: "add-account",
    icon: <AddIcon/>,
    label: "Add Account"
  })
  panelList.push({
    value: "add-account",
    children: <CreateAccount/>
  })

  return (
    <BankingContainer>
      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </BankingContainer>
  )

  // return (
  //   <div className="banking-container">
      
  //     {
  //       // TODO: change colors of text
  //       bankingAccounts.length !== 0 && <AllBankingSummary></AllBankingSummary>
  //     }

  //     <BankAccounts label={ FINANCE_ITEM_TYPES.banking }></BankAccounts>
  //   </div>
  // );
};

export default Banking;