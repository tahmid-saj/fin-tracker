export enum SAVINGS_GOAL_CALCULATOR_ACTION_TYPES {
  SET_SAVINGS_GOAL_RESULT = "savings-goal-calculator/SET_SAVINGS_GOAL_RESULT",
  SET_SAVINGS_GOAL_SCHEDULE_RESULT = "savings-goal-calculator/SET_SAVINGS_GOAL_SCHEDULE_RESULT"
}

export type SavingsGoalResult = {
  savingsGoal: number;
  yearsToReachGoal: number;
  interestRatePerYear: number;
  compounded: string;
  amountFirstDeposit: number;
  dateFirstDeposit: string;
  monthlyDepositRequired: number;
  dailyDepositRequired: number;
  weeklyDepositRequired: number;
}

export type SavingsGoalScheduleResult = {
  currentDate: string;
  monthlyDeposit: number;
  interestEarned: number;
  totalInterestEarned: number;
  balance: number;
}