export enum SAVINGS_ACTION_TYPES {
  SET_SAVINGS_ACCOUNTS = "savings/SET_SAVINGS_ACCOUNTS",
  SET_SAVINGS_ACCOUNTS_SUMMARY = "savings/SET_SAVINGS_ACCOUNTS_SUMMARY" 
}

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