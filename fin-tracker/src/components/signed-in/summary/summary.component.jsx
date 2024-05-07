import React, { useContext, Fragment } from "react";
import BankingSummary from "./banking/banking-summary.component";
import InvestmentsSummary from "./investments/investments-summary.component";
import SavingsSummary from "./savings/savings-summary.component";

import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";
import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context";
import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context";
import { DashboardContext } from "../../../contexts/signed-in/dashboard/dashboard.context";

import "./summary.styles.scss";
import ExpensesSummary from "./expenses/expenses.component";
import { ExpensesContext } from "../../../contexts/signed-in/expenses/expenses.context";

const Summary = () => {
  const { summaries } = useContext(DashboardContext);
  const { expenses } = useContext(ExpensesContext)
  const { bankingAccounts } = useContext(BankingContext);
  const { investments } = useContext(InvestmentsContext);
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    (bankingAccounts.length === 0 && investments.length === 0 && savingsAccounts.length === 0 ) ? 
    <div className="empty-dashboard-container">
      <h2>Nothing yet, track some finance to get started!</h2>
    </div>
    :
    <div className="accounts-summary-dashboard-container">
      {
        expenses.length ? 
        <Fragment>
          <ExpensesSummary></ExpensesSummary> 
        </Fragment>
        : null
      }
      
      <h1>Summary</h1>

      <div className="summary-dashboard-container">
        {
          bankingAccounts.length !== 0 && 
          <div className="summary-dashboard-banking-container">
            <h4>{`Total Banking Balance - $${summaries.bankingSummary.currentAllBankingBalance}`}</h4>
            <h4>{`Total In - $${summaries.bankingSummary.totalAllBankingIn}`}</h4>
            <h4>{`Total Out - $${summaries.bankingSummary.totalAllBankingOut}`}</h4>
          </div>
        }
        {
          investments.length !== 0 &&
          <div className="summary-dashboard-investments-container">
            <h4>{`Total Investments Balance - $${summaries.investmentsSummary.currentAllInvestmentsBalance}`}</h4>
            <h4>{`Total Contribution - $${summaries.investmentsSummary.totalAllContribution}`}</h4>
            <h4>{`Total Interest - $${summaries.investmentsSummary.totalAllInterest}`}</h4>
          </div>
        }
        {
          savingsAccounts.length !== 0 &&
          <div className="summary-dashboard-savings-container">
            <h4>{`Total Savings Balance - $${summaries.savingsAccountsSummary.currentAllSavingsAccountsBalance}`}</h4>
            <h4>{`Total Contribution - $${summaries.savingsAccountsSummary.totalAllContribution}`}</h4>
            <h4>{`Total Interest - $${summaries.savingsAccountsSummary.totalAllInterest}`}</h4>
          </div>
        }
      </div>

      <div className="dashboard-accounts-summary-container">
        
        {
          bankingAccounts.length !== 0 && <BankingSummary></BankingSummary>
        }
        {
          investments.length !== 0 && <InvestmentsSummary></InvestmentsSummary>
        }
        {
          savingsAccounts.length !== 0 && <SavingsSummary></SavingsSummary>
        }
      </div>
        
    </div>
  );
};

export default Summary;
