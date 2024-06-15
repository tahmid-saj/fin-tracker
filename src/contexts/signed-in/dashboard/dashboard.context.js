import { createContext, useState, useEffect, useContext } from "react";

import { ExpensesContext } from "../expenses/expenses.context";
import { BankingContext } from "../banking/banking.context";
import { InvestmentsContext } from "../investments/investments.context";
import { SavingsContext } from "../savings/savings.context";
import { InsuranceContext } from "../insurance/insurance.context";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

export const DashboardContext = createContext({
  summaries: {},
  // summaries structure:
  // {
  //   bankingSummary: bankingSummary -> from useContext,
  //   investmentsSummary: investmentsSummary -> from useContext,
  //   savingsAccountsSummary: savingsAccountsSummary -> from useContext
  // }

  userSummary: {},
  // useSummary structure:
  // {
  //   userId: "generated from firebase",
  //   email: "generated from firebase",
  //   bankAccounts: bankingAccounts,
  //   investments: investments,
  //   savingsAccounts: savingsAccounts.
  // }
});

export const DashboardProvider = ({ children }) => {
  const [summaries, setSummaries] = useState({});
  const [userSummary, setUserSummary] = useState({});

  const value = { summaries, userSummary }
  
  const { expenses, expensesSummary } = useContext(ExpensesContext)
  const { bankingAccounts, bankingSummary } = useContext(BankingContext);
  const { investments, investmentsSummary } = useContext(InvestmentsContext);
  const { savingsAccounts, savingsAccountsSummary } = useContext(SavingsContext);
  const { insurances, insurancesSummary } = useContext(InsuranceContext)

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    // updating summaries
    setSummaries({
      expensesSummary: expensesSummary,
      bankingSummary: bankingSummary,
      investmentsSummary: investmentsSummary,
      savingsAccountsSummary: savingsAccountsSummary,
      insurancesSummary: insurancesSummary
    });
  }, [expensesSummary, bankingSummary, investmentsSummary, savingsAccountsSummary, insurancesSummary]);

  useEffect(() => {
    // updating userSummary if user is signed in
    if (currentUser) {
      setUserSummary({
        userId: currentUser.uid,
        email: currentUser.email,
        expenses: expenses,
        bankingAccounts: bankingAccounts,
        investments: investments,
        savingsAccounts: savingsAccounts,
        insurances: insurances,
      })
    } 
    
  }, [expenses, bankingAccounts, investments, savingsAccounts, insurances]);

  return (
    <DashboardContext.Provider value={ value }>
      { children }
    </DashboardContext.Provider>
  );
};
