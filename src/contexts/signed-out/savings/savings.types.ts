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