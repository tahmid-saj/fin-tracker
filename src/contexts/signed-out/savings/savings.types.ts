import { ReactNode } from "react";

// savings types

export type SavingsAccount = {
  savingsAccountName: string;
  initialDeposit: number;
  startDate: string;
  monthlyContribution: number;
  contributionPeriod: number;
  contributionInterval: string;
  apy: number;

  totalSavings: number;
  totalContribution: number;
  totalInterest: number;

  savings: SavingsCalculationRecord[];
}

export type SavingsAccountCalculated = {
  totalSavings: number;
  totalContribution: number;
  totalInterest: number;

  savings: SavingsCalculationRecord[];
}

export interface SavingsContextType {
  savingsAccounts: SavingsAccount[];

  createSavingsAccount: (savingsAccount: SavingsAccount) => void;
  updateSavingsAccount: (originalSavingsAccountName: string, updatedSavingsAccount: SavingsAccount) => void;
  closeSavingsAccount: (closingSavingsAccountName: string) => void;
  getSavingsAccountInfo: (savingsAccountName: string) => void;

  savingsAccountsSummary: SavingsAccountsSummary;
}

export interface SavingsProviderProps {
  children: ReactNode;
}

export type SavingsCalculationRecord = {
  currentDate: string;
  interestEarned: number;
  totalInterestEarned: number;
  balance: number;
}

export type SavingsAccountsSummary = {
  currentAllSavingsAccountsBalance?: number;
  totalAllContribution?: number;
  totalAllInterest?: number;
}