import { SAVINGS_GOAL_CALCULATOR_ACTION_TYPES } from "./savings-goal-calculator.types";

export const SAVINGS_GOAL_CALCULATOR_INITIAL_STATE = {
  savingsGoalResult: undefined,
  savingsGoalScheduleResult: undefined
}

export const savingsGoalCalculatorReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_RESULT:
      return {
        ...state,
        savingsGoalResult: payload
      }
    case SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_SCHEDULE_RESULT:
      return {
        ...state,
        savingsGoalScheduleResult: payload
      }
    default:
      return state
  }
}