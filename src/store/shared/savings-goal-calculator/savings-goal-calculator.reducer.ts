import { AnyAction } from "redux";
import { SAVINGS_GOAL_CALCULATOR_ACTION_TYPES, SavingsGoalResult, SavingsGoalScheduleResult } from "./savings-goal-calculator.types";
import { calculateSavingsGoal, calculateSavingsGoalSchedule } from "./savings-goal-calculator.action";

export type SavingsGoalState = {
  readonly savingsGoalResult: SavingsGoalResult | null | undefined;
  readonly savingsGoalScheduleResult: SavingsGoalScheduleResult[] | null | undefined;
}

export const SAVINGS_GOAL_CALCULATOR_INITIAL_STATE: SavingsGoalState = {
  savingsGoalResult: undefined,
  savingsGoalScheduleResult: undefined
}

export const savingsGoalCalculatorReducer = (state=SAVINGS_GOAL_CALCULATOR_INITIAL_STATE, action: AnyAction): SavingsGoalState => {
  if (calculateSavingsGoal.match(action)) {
    return {
      ...state,
      savingsGoalResult: action.payload
    }
  }

  if (calculateSavingsGoalSchedule.match(action)) {
    return {
      ...state,
      savingsGoalScheduleResult: action.payload
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_RESULT:
  //     return {
  //       ...state,
  //       savingsGoalResult: payload
  //     }
  //   case SAVINGS_GOAL_CALCULATOR_ACTION_TYPES.SET_SAVINGS_GOAL_SCHEDULE_RESULT:
  //     return {
  //       ...state,
  //       savingsGoalScheduleResult: payload
  //     }
  //   default:
  //     return state
  // }
}