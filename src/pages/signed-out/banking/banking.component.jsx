import React, { Component, useContext, useEffect, Fragment } from "react";
import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../store/signed-out/banking/banking.selector";
import { setBankingSummary } from "../../../store/signed-out/banking/banking.action";

import BankAccounts from "../../../components/signed-out/banking/bank-accounts/bank-accounts.component";

import "./banking.styles.jsx";
import { BankingContainer } from "./banking.styles.jsx";

// import { BankingContext } from "../../../contexts/signed-out/banking/banking.context";
import AllBankingSummary from "../../../components/signed-out/banking/all-banking-summary/all-banking-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";
import SummaryGraphBanking from "../../../components/signed-out/banking/summary-graph/summary-graph.component";

import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AddIcon from '@mui/icons-material/Add';
import CreateAccount from "../../../components/signed-out/banking/create-account/create-account.component.jsx";
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx";

const Banking = () => {
  // const { bankingAccounts } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)
  const dispatch = useDispatch()

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts);

    console.log(bankingAccounts);

    dispatch(setBankingSummary({ 
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut 
    }))
  }, [bankingAccounts, dispatch])

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
  //       bankingAccounts.length !== 0 && 
  //       <Fragment>
  //         <AllBankingSummary></AllBankingSummary>
  //       </Fragment>
  //     }

  //     <BankAccounts label={ FINANCE_ITEM_TYPES.banking }></BankAccounts>
  //   </div>
  // );
};

export default Banking;