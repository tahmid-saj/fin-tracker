import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from "react";

import { ExpensesContext } from "../expenses/expenses.context";
import { BankingContext } from "../banking/banking.context";
import { InvestmentsContext } from "../investments/investments.context";
import { SavingsContext } from "../savings/savings.context";
import { InsuranceContext } from "../insurance/insurance.context";

import { DashboardContextType, DashboardProviderProps, Summaries, UserSummary } from "./dashboard.types"

export const DashboardContext = createContext<DashboardContextType>({
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
  //   bankAccounts: bankingAccounts,
  //   investments: investments,
  //   savingsAccounts: savingsAccounts.
  // }
});

export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [summaries, setSummaries] = useState<Summaries | {}>({});
  const [userSummary, setUserSummary] = useState<UserSummary | {}>({});

  const value = { summaries, userSummary }

  const { expenses, expensesSummary } = useContext(ExpensesContext)
  const { bankingAccounts, bankingSummary } = useContext(BankingContext);
  const { investments, investmentsSummary } = useContext(InvestmentsContext);
  const { savingsAccounts, savingsAccountsSummary } = useContext(SavingsContext);
  const { insurances, insurancesSummary } = useContext(InsuranceContext)

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
    setUserSummary({
      expenses: expenses,
      bankingAccounts: bankingAccounts,
      investments: investments,
      savingsAccounts: savingsAccounts,
      insurances: insurances,
    })
  }, [expenses, bankingAccounts, investments, savingsAccounts, insurances]);

  return (
    <DashboardContext.Provider value={ value }>
      { children }
    </DashboardContext.Provider>
  );
};
