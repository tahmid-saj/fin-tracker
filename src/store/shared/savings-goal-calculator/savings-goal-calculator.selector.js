import { createSelector } from "reselect";

const selectSavingsGoalCalculatorReducer = state => state.savingsGoalCalculator

export const selectSavingsGoalResult = createSelector(
  [selectSavingsGoalCalculatorReducer],
  (savingsGoalCalculator) => savingsGoalCalculator.savingsGoalResult
)

export const selectSavingsGoalScheduleResult = createSelector(
  [selectSavingsGoalCalculatorReducer],
  (savingsGoalCalculator) => savingsGoalCalculator.savingsGoalScheduleResult
)