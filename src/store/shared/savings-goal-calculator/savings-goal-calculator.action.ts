import { validateSavingsGoalInput } from "../../../utils/validations/savings.validation"
import { calculateSavingsGoal as _calculateSavingsGoal, 
  calculateSavingsGoalSchedule as _calculateSavingsGoalSchedule
} from "../../../utils/calculations/savings.calculations";

import { ActionWithPayload, createAction, withMatcher } from "../../../utils/reducer/reducer.utils";
import { SAVINGS_GOAL_CALCULATOR_ACTION_TYPES, SavingsGoalResult, SavingsGoalScheduleResult } from "./savings-goal-calculator.types";

export type CalculateSavingsGoal = ActionWithPayload<SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_RESULT, SavingsGoalResult | undefined>
export type CalculateSavingsGoalSchedule = ActionWithPayload<SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_SCHEDULE_RESULT, SavingsGoalScheduleResult[]>

type SavingsGoalInput = {
  savingsGoal: number;
  yearsToReachGoal: number;
  interestRatePerYear: number;
  compounded: string;
  amountFirstDeposit: number;
  dateFirstDeposit: string;
}

// helper functions
const calculateSavingsGoalHelper = (savingsGoalResult: SavingsGoalResult, savingsGoalInput: SavingsGoalInput): SavingsGoalResult | undefined => {
  if (validateSavingsGoalInput(savingsGoalInput)) {
    return savingsGoalResult
  }

  return _calculateSavingsGoal({
    savingsGoal: Number(savingsGoalInput.savingsGoal),
    yearsToReachGoal: Number(savingsGoalInput.yearsToReachGoal),
    interestRatePerYear: Number(savingsGoalInput.interestRatePerYear),
    compounded: String(savingsGoalInput.compounded),
    amountFirstDeposit: Number(savingsGoalInput.amountFirstDeposit),
    dateFirstDeposit: String(savingsGoalInput.dateFirstDeposit)
  })
}

const calculateSavingsGoalScheduleHelper = (savingsGoalResult: SavingsGoalResult): SavingsGoalScheduleResult[] => {
  return _calculateSavingsGoalSchedule(savingsGoalResult)
}

// action

export const calculateSavingsGoal = withMatcher((savingsGoalResult: SavingsGoalResult, savingsGoalInput: SavingsGoalInput): CalculateSavingsGoal => {
  const newSavingsGoalResult = calculateSavingsGoalHelper(savingsGoalResult, savingsGoalInput)
  return createAction(SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_RESULT, newSavingsGoalResult)
})

export const calculateSavingsGoalSchedule = withMatcher((savingsGoalResult: SavingsGoalResult): CalculateSavingsGoalSchedule => {
  const newSavingsGoalScheduleResult = calculateSavingsGoalScheduleHelper(savingsGoalResult)
  return createAction(SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_SCHEDULE_RESULT, newSavingsGoalScheduleResult)
})