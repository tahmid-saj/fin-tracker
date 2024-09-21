// savings goal calculator types

import { ReactNode } from "react";

export interface SavingsGoalCalculatorContextType {
  savingsGoalResult: SavingsGoalResult | undefined;
  savingsGoalScheduleResult: SavingsGoalScheduleResult[] | undefined;

  calculateSavingsGoal: (savingsGoalResult: SavingsGoalResult) => void;
  calculateSavingsGoalSchedule: (savingsGoalResult: SavingsGoalResult) => void;
}

export interface SavingsGoalCalculatorProviderProps {
  children: ReactNode;
}

export type SavingsGoalInput = {
  savingsGoal: number,
  yearsToReachGoal: number,
  interestRatePerYear: number,
  compounded: string,
  amountFirstDeposit: number,
  dateFirstDeposit: string
}

export type SavingsGoalResult = {
  savingsGoal: number,
  yearsToReachGoal: number,
  interestRatePerYear: number,
  compounded: string,
  amountFirstDeposit: number,
  dateFirstDeposit: string,
  monthlyDepositRequired: number,
  dailyDepositRequired: number,
  weeklyDepositRequired: number
}

export type SavingsGoalScheduleResult = {
  currentDate: string,
  monthlyDeposit: number,
  interestEarned: number,
  totalInterestEarned: number,
  balance: number
}

