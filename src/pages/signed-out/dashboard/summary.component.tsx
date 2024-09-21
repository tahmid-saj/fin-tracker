import "./summary.styles.jsx";
import { DashboardContainer, FinanceItemsSummary, FinanceItemsSummaryInfo
} from "./summary.styles.jsx";

import React, { useEffect, Fragment } from "react";
import ChatBot from "../../shared/chatbot/chatbot.component.js";
import ExpensesSummary from "../../../components/signed-out/summary/expenses/expenses.component.jsx";
import BankingSummary from "../../../components/signed-out/summary/banking/banking-summary.component.jsx";
import InvestmentsSummary from "../../../components/signed-out/summary/investments/investments-summary.component.jsx";
import SavingsSummary from "../../../components/signed-out/summary/savings/savings-summary.component.jsx";
import InsurancesSummary from "../../../components/signed-out/summary/insurance/insurance-summary.component.jsx";

// import { BankingContext } from "../../../contexts/signed-out/banking/banking.context";
// import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";
// import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
// import { DashboardContext } from "../../../contexts/signed-out/dashboard/dashboard.context";
// import { ExpensesContext } from "../../../contexts/signed-out/expenses/expenses.context";

import { useDispatch, useSelector } from "react-redux";
import { selectSummaries } from "../../../store/signed-out/dashboard/dashboard.selector.js";
import { selectExpenses, selectExpensesSummary, selectSelectedExpensesDate } from "../../../store/signed-out/expenses/expenses.selector.js";
import { selectBankingAccounts, selectBankingSummary } from "../../../store/signed-out/banking/banking.selector.js";
import { selectInvestments, selectInvestmentsSummary } from "../../../store/signed-out/investments/investments.selector.js";
import { selectSavingsAccounts, selectSavingsAccountsSummary } from "../../../store/signed-out/savings/savings.selector.js";
import { selectInsurances, selectInsurancesSummary } from "../../../store/signed-out/insurance/insurance.selector.js";  
import { setSummaries, setUserSummary } from "../../../store/signed-out/dashboard/dashboard.action.js";
import { selectScheduledExpensesHelper, setScheduledExpensesView } from "../../../store/signed-out/expenses/expenses.action.js";

import { selectInsurancePayments, selectSelectedInsurancePaymentsDate } from "../../../store/signed-out/insurance/insurance.selector.js";
import { selectScheduledInsurancePaymentsHelper, setScheduledInsurancePaymentsView } from "../../../store/signed-out/insurance/insurance.action.js";

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
  // const { summaries } = useContext(DashboardContext);
  // const { expenses } = useContext(ExpensesContext)
  // const { bankingAccounts } = useContext(BankingContext);
  // const { investments } = useContext(InvestmentsContext);
  // const { savingsAccounts } = useContext(SavingsContext);
  const dispatch = useDispatch()

  const summaries = useSelector(selectSummaries)
  const expenses = useSelector(selectExpenses)
  const bankingAccounts = useSelector(selectBankingAccounts)
  const investments = useSelector(selectInvestments)
  const savingsAccounts = useSelector(selectSavingsAccounts)
  const insurances = useSelector(selectInsurances)

  const expensesSummary = useSelector(selectExpensesSummary)
  const bankingSummary = useSelector(selectBankingSummary)
  const investmentsSummary = useSelector(selectInvestmentsSummary)
  const savingsAccountsSummary = useSelector(selectSavingsAccountsSummary)
  const insurancesSummary = useSelector(selectInsurancesSummary)

  const selectedExpensesDate = useSelector(selectSelectedExpensesDate)

  const insurancePayments = useSelector(selectInsurancePayments)
  const selectedInsurancePaymentsDate = useSelector(selectSelectedInsurancePaymentsDate)

  useEffect(() => {
    // updating summaries
    dispatch(setSummaries({
      expensesSummary: expensesSummary,
      bankingSummary: bankingSummary,
      investmentsSummary: investmentsSummary,
      savingsAccountsSummary: savingsAccountsSummary,
      insurancesSummary: insurancesSummary
    }))
  }, [expensesSummary, bankingSummary, investmentsSummary, savingsAccountsSummary, insurancesSummary, dispatch]);

  useEffect(() => {
    // updating userSummary if user is signed in
    dispatch(setUserSummary({
      expenses: expenses,
      bankingAccounts: bankingAccounts,
      investments: investments,
      savingsAccounts: savingsAccounts,
      insurances: insurances
    }))
  }, [expenses, bankingAccounts, investments, savingsAccounts, insurances, dispatch]);

  // update scheduledExpensesView when expenses or selectedExpensesDate change
  useEffect(() => {
    if (selectedExpensesDate) {
      if (expenses) {
        dispatch(setScheduledExpensesView(selectScheduledExpensesHelper(expenses, selectedExpensesDate)))
      }
    } else {
      dispatch(setScheduledExpensesView(null))
    }
  }, [expenses, selectedExpensesDate, dispatch])

  // update scheduledInsurancePaymentsView when insurances or selectedInsurancePaymentsDate change
  useEffect(() => {
    if (selectedInsurancePaymentsDate) {
      if (insurancePayments) {
        dispatch(setScheduledInsurancePaymentsView(selectScheduledInsurancePaymentsHelper(insurancePayments, selectedInsurancePaymentsDate)))
      }
    } else {
      dispatch(setScheduledInsurancePaymentsView(null))
    }
  }, [insurancePayments, selectedInsurancePaymentsDate, dispatch])

  let tabList = [{
    value: "chatbot",
    icon: <SmartToyIcon/>,
    label: "Chatbot"
  }]
  let panelList = [{
    value: "chatbot",
    children: <ChatBot/>
  }]

  if (expenses && bankingAccounts && investments && savingsAccounts && insurances && 
    expenses.length === 0 && bankingAccounts.length === 0 && investments.length === 0 && savingsAccounts.length === 0 && insurances.length === 0) {
    return (
      <DashboardContainer>
        <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
      </DashboardContainer>
    )
  }

  if (expenses && expenses.length !== 0) {
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

  if (bankingAccounts && summaries &&
    bankingAccounts.length !== 0 && summaries.bankingSummary !== null && summaries.bankingSummary !== undefined && Object.keys(summaries.bankingSummary).length) {
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

  if (investments && summaries && 
    investments.length !== 0 && summaries.investmentsSummary !== null && summaries.investmentsSummary !== undefined && Object.keys(summaries.investmentsSummary).length) {
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

  if (savingsAccounts && summaries && 
    savingsAccounts.length !== 0 && summaries.savingsAccountsSummary !== null && summaries.savingsAccountsSummary !== undefined && Object.keys(summaries.savingsAccountsSummary).length) {
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

  if (insurances && insurances.length !== 0) {
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
  //       (expenses.length === 0 && bankingAccounts.length === 0 && investments.length === 0 && savingsAccounts.length === 0 && insurances.length === 0) ? 
  //       <div className="empty-dashboard-container">
  //         <h2>Nothing yet in the dashboard, track some finance to get started!</h2>
  //       </div>
  //       :
  //       <div className="accounts-summary-dashboard-container">
  //         {
  //           expenses.length !== 0 ? 
  //           <Fragment>
  //             <ExpensesSummary></ExpensesSummary> 
  //           </Fragment>
  //           : null
  //         }

  //         {
  //           insurances.length !== 0 ? 
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
