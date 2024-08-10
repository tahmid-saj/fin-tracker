import { createSelector } from "reselect";
import { SavingsGoalState } from "./savings-goal-calculator.reducer";

const selectSavingsGoalCalculatorReducer = (state): SavingsGoalState => state.savingsGoalCalculator

export const selectSavingsGoalResult = createSelector(
  [selectSavingsGoalCalculatorReducer],
  (savingsGoalCalculator) => savingsGoalCalculator.savingsGoalResult
)

export const selectSavingsGoalScheduleResult = createSelector(
  [selectSavingsGoalCalculatorReducer],
  (savingsGoalCalculator) => savingsGoalCalculator.savingsGoalScheduleResult
)