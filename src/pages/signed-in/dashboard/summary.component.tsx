import "./summary.styles.jsx";
import { DashboardContainer, FinanceItemsSummary, FinanceItemsSummaryInfo
} from "./summary.styles.jsx";

import React, { useContext, Fragment } from "react";
import ExpensesSummary from "../../../components/signed-in/summary/expenses/expenses.component.jsx";
import BankingSummary from "../../../components/signed-in/summary/banking/banking-summary.component.jsx";
import InvestmentsSummary from "../../../components/signed-in/summary/investments/investments-summary.component.jsx";
import SavingsSummary from "../../../components/signed-in/summary/savings/savings-summary.component.jsx";
import InsurancesSummary from "../../../components/signed-in/summary/insurance/insurance-summary.component.jsx"

import { DashboardContext } from "../../../contexts/signed-in/dashboard/dashboard.context.js";
import { ExpensesContext } from "../../../contexts/signed-in/expenses/expenses.context.js";
import { BankingContext } from "../../../contexts/signed-in/banking/banking.context.js";
import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context.js";
import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context.js";
import { InsuranceContext } from "../../../contexts/signed-in/insurance/insurance.context.js";

import ChatBot from "../../shared/chatbot/chatbot.component.js";

import SmartToyIcon from '@mui/icons-material/SmartToy';
import PaidIcon from '@mui/icons-material/Paid'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentIcon from '@mui/icons-material/Payment';
import SavingsIcon from '@mui/icons-material/Savings';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"
import { Typography } from "@mui/material";
import SimplePaper from "../../../components/shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const Summary = () => {
  const { summaries } = useContext(DashboardContext);
  const { expenses } = useContext(ExpensesContext)
  const { bankingAccounts } = useContext(BankingContext);
  const { investments } = useContext(InvestmentsContext);
  const { savingsAccounts } = useContext(SavingsContext);
  const { insurances } = useContext(InsuranceContext)

  let tabList = [{
    value: "chatbot",
    icon: <SmartToyIcon/>,
    label: "Chatbot"
  }]
  let panelList = [{
    value: "chatbot",
    children: <ChatBot/>
  }]

  if (expenses.length === 0 && bankingAccounts.length === 0 && investments.length === 0 && savingsAccounts.length === 0 && insurances.length === 0) {
    return (
      <DashboardContainer>
        <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
      </DashboardContainer>
    )
  }

  if (expenses.length !== 0) {
    tabList.push({
      value: "expenses",
      icon: <PaidIcon/>,
      label: "Expenses"
    })

    panelList.push({
      value: "expenses",
      children: (
        <FinanceItemsSummary>
          <ExpensesSummary></ExpensesSummary> 
        </FinanceItemsSummary>
      )
    })
  }

  if (bankingAccounts.length !== 0 && summaries.bankingSummary !== null && summaries.bankingSummary !== undefined && Object.keys(summaries.bankingSummary).length) {
    tabList.push({
      value: "banking",
      icon: <AccountBalanceIcon/>,
      label: "Banking"
    })

    panelList.push({
      value: "banking",
      children: (
        <FinanceItemsSummary>
          <FinanceItemsSummaryInfo>
            <SimplePaper styles={ paperStyles }>
              <Typography variant="body1">{`Total Banking Balance - $${summaries?.bankingSummary?.currentAllBankingBalance?.toFixed(2)}`}</Typography>
              <Typography variant="body1">{`Total In - $${summaries?.bankingSummary?.totalAllBankingIn?.toFixed(2)}`}</Typography>
              <Typography variant="body1">{`Total Out - $${summaries?.bankingSummary?.totalAllBankingOut?.toFixed(2)}`}</Typography>
            </SimplePaper>
          </FinanceItemsSummaryInfo>
          <BankingSummary/>
        </FinanceItemsSummary>
      )
    })
  }

  if (investments.length !== 0 && summaries.investmentsSummary !== null && summaries.investmentsSummary !== undefined && Object.keys(summaries.investmentsSummary).length) {
    tabList.push({
      value: "investments",
      icon: <PaymentIcon/>,
      label: "Investments"
    })

    panelList.push({
      value: "investments",
      children: (
        <FinanceItemsSummary>
          <FinanceItemsSummaryInfo>
            <SimplePaper styles={ paperStyles }>
              <Typography variant="body1">{`Total Investments Balance - $${summaries?.investmentsSummary?.currentAllInvestmentsBalance?.toFixed(2)}`}</Typography>
              <Typography variant="body1">{`Total Contribution - $${summaries?.investmentsSummary?.totalAllContribution?.toFixed(2)}`}</Typography>
              <Typography variant="body1">{`Total Interest - $${summaries?.investmentsSummary?.totalAllInterest?.toFixed(2)}`}</Typography>
            </SimplePaper>
          </FinanceItemsSummaryInfo>
          <InvestmentsSummary/>
        </FinanceItemsSummary>
      )
    })
  }

  if (savingsAccounts.length !== 0 && summaries.savingsAccountsSummary !== null && summaries.savingsAccountsSummary !== undefined && Object.keys(summaries.savingsAccountsSummary).length) {
    tabList.push({
      value: "savings",
      icon: <SavingsIcon/>,
      label: "Savings"
    })

    panelList.push({
      value: "savings",
      children: (
        <FinanceItemsSummary>
          <FinanceItemsSummaryInfo>
            <SimplePaper styles={ paperStyles }>
              <Typography variant="body1">{`Total Savings Balance - $${summaries?.savingsAccountsSummary?.currentAllSavingsAccountsBalance?.toFixed(2)}`}</Typography>
              <Typography variant="body1">{`Total Contribution - $${summaries?.savingsAccountsSummary?.totalAllContribution?.toFixed(2)}`}</Typography>
              <Typography variant="body1">{`Total Interest - $${summaries?.savingsAccountsSummary?.totalAllInterest?.toFixed(2)}`}</Typography>
            </SimplePaper>
          </FinanceItemsSummaryInfo>
          <SavingsSummary/>
        </FinanceItemsSummary>
      )
    })
  }

  if (insurances.length !== 0) {
    tabList.push({
      value: "insurance",
      icon: <SafetyCheckIcon/>,
      label: "Insurance"
    })

    panelList.push({
      value: "insurance",
      children: (
        <FinanceItemsSummary>
          <InsurancesSummary></InsurancesSummary> 
        </FinanceItemsSummary>
      )
    })
  }

  return (
    <DashboardContainer>
      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </DashboardContainer>
  )

  // return (
  //   <Fragment>
  //     <ChatBot></ChatBot>
  //     {
  //       (expenses.length === 0 && bankingAccounts.length === 0 && investments.length === 0 && savingsAccounts.length === 0 ) ? 
  //       <div className="empty-dashboard-container">
  //         <h2>Nothing yet, track some finance to get started!</h2>
  //       </div>
  //       :
  //       <div className="accounts-summary-dashboard-container">
  //         {
  //           expenses.length ? 
  //           <Fragment>
  //             <ExpensesSummary></ExpensesSummary> 
  //           </Fragment>
  //           : null
  //         }

  //         {
  //           insurances.length ? 
  //           <Fragment>
  //             <InsurancesSummary></InsurancesSummary> 
  //           </Fragment>
  //           : null
  //         }
          
  //         {/* <h1>Summary</h1> */}

  //         <div className="summary-dashboard-container">
  //           {
  //             bankingAccounts.length !== 0 && 
  //             <div className="summary-dashboard-banking-container">
  //               <h4>{`Total Banking Balance - $${summaries.bankingSummary.currentAllBankingBalance}`}</h4>
  //               <h4>{`Total In - $${summaries.bankingSummary.totalAllBankingIn}`}</h4>
  //               <h4>{`Total Out - $${summaries.bankingSummary.totalAllBankingOut}`}</h4>
  //             </div>
  //           }
  //           {
  //             investments.length !== 0 &&
  //             <div className="summary-dashboard-investments-container">
  //               <h4>{`Total Investments Balance - $${summaries.investmentsSummary.currentAllInvestmentsBalance}`}</h4>
  //               <h4>{`Total Contribution - $${summaries.investmentsSummary.totalAllContribution}`}</h4>
  //               <h4>{`Total Interest - $${summaries.investmentsSummary.totalAllInterest}`}</h4>
  //             </div>
  //           }
  //           {
  //             savingsAccounts.length !== 0 &&
  //             <div className="summary-dashboard-savings-container">
  //               <h4>{`Total Savings Balance - $${summaries.savingsAccountsSummary.currentAllSavingsAccountsBalance}`}</h4>
  //               <h4>{`Total Contribution - $${summaries.savingsAccountsSummary.totalAllContribution}`}</h4>
  //               <h4>{`Total Interest - $${summaries.savingsAccountsSummary.totalAllInterest}`}</h4>
  //             </div>
  //           }
  //         </div>

  //         <div className="dashboard-accounts-summary-container">
            
  //           {
  //             bankingAccounts.length !== 0 && <BankingSummary></BankingSummary>
  //           }
  //           {
  //             investments.length !== 0 && <InvestmentsSummary></InvestmentsSummary>
  //           }
  //           {
  //             savingsAccounts.length !== 0 && <SavingsSummary></SavingsSummary>
  //           }
  //         </div>
            
  //       </div>
  //     }
  //   </Fragment>
  // );
};

export default Summary;
