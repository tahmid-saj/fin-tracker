import { BankingAccount, BankingSummary } from "../banking/banking.types"
import { Expense, ExpensesSummary } from "../expenses/expenses.types";
import { Insurance, InsurancesSummary } from "../insurance/insurance.types";
import { Investment, InvestmentsSummary } from "../investments/investments.types";
import { SavingsAccount, SavingsAccountsSummary } from "../savings/savings.types";

export enum DASHBOARD_ACTION_TYPES {
  SET_SUMMARIES = "dashboard/SET_SUMMARIES",
  SET_USER_SUMMARY = "dashboard/SET_USER_SUMMARY"
}

export type Summaries = {
  expensesSummary?: ExpensesSummary | null | undefined;
  bankingSummary?: BankingSummary | null | undefined;
  investmentsSummary?: InvestmentsSummary | null | undefined;
  savingsAccountsSummary?: SavingsAccountsSummary | null | undefined;
  insurancesSummary?: InsurancesSummary | null | undefined;
}

export type UserSummary = {
  expenses?: Expense[]  | null | undefined;
  bankingAccounts?: BankingAccount[]  | null | undefined;
  investments?: Investment[]  | null | undefined;
  savingsAccounts?: SavingsAccount[]  | null | undefined;
  insurances?: Insurance[]  | null | undefined;
}