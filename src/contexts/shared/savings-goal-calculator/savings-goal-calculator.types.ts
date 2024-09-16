// savings goal calculator types
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