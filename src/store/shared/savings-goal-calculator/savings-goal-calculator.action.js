import { validateSavingsGoalInput } from "../../../utils/validations/savings.validation"
import { calculateSavingsGoal as _calculateSavingsGoal, 
  calculateSavingsGoalSchedule as _calculateSavingsGoalSchedule
} from "../../../utils/calculations/savings.calculations";

import { createAction } from "../../../utils/reducer/reducer.utils";
import { SAVINGS_GOAL_CALCULATOR_ACTION_TYPES } from "./savings-goal-calculator.types";

// helper functions
const calculateSavingsGoalHelper = (savingsGoalResult, savingsGoalInput) => {
  if (validateSavingsGoalInput(savingsGoalInput)) {
    console.log("invalid savings goal input")
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

const calculateSavingsGoalScheduleHelper = (savingsGoalResult) => {
  return _calculateSavingsGoalSchedule(savingsGoalResult)
}

// action

export const calculateSavingsGoal = (savingsGoalResult, savingsGoalInput) => {
  const newSavingsGoalResult = calculateSavingsGoalHelper(savingsGoalResult, savingsGoalInput)
  return createAction(SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_RESULT, newSavingsGoalResult)
}

export const calculateSavingsGoalSchedule = (savingsGoalResult) => {
  const newSavingsGoalScheduleResult = calculateSavingsGoalScheduleHelper(savingsGoalResult)
  return createAction(SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_SCHEDULE_RESULT, newSavingsGoalScheduleResult)
}