import { ReactNode } from "react";
import { BankingAccount, BankingSummary } from "../banking/banking.types"
import { Expense, ExpensesSummary } from "../expenses/expenses.types";
import { Insurance, InsurancesSummary } from "../insurance/insurance.types";
import { Investment, InvestmentsSummary } from "../investments/investments.types";
import { SavingsAccount, SavingsAccountsSummary } from "../savings/savings.types";

export interface DashboardContextType {
  summaries: Summaries;
  userSummary: UserSummary;
}

export interface DashboardProviderProps {
  children: ReactNode
}

export enum DASHBOARD_ACTION_TYPES {
  SET_SUMMARIES = "dashboard/SET_SUMMARIES",
  SET_USER_SUMMARY = "dashboard/SET_USER_SUMMARY"
}

export type Summaries = {
  expensesSummary?: ExpensesSummary;
  bankingSummary?: BankingSummary;
  investmentsSummary?: InvestmentsSummary;
  savingsAccountsSummary?: SavingsAccountsSummary;
  insurancesSummary?: InsurancesSummary;
}

export type UserSummary = {
  expenses?: Expense[];
  bankingAccounts?: BankingAccount[];
  investments?: Investment[];
  savingsAccounts?: SavingsAccount[];
  insurances?: Insurance[];
}