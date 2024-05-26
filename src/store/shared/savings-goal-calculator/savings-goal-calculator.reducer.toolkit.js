import { createSlice } from "@reduxjs/toolkit";

export const SAVINGS_GOAL_CALCULATOR_INITIAL_STATE = {
  savingsGoalResult: undefined,
  savingsGoalScheduleResult: undefined
}

export const savingsGoalCalculatorSlice = createSlice({
  name: "savingsGoalCalculator",
  initialState: SAVINGS_GOAL_CALCULATOR_INITIAL_STATE,
  reducers: {
    setSavingsGoalResult(state, action) {
      state.savingsGoalResult = action.payload
    },
    setSavingsGoalScheduleResult(state, action) {
      state.savingsGoalScheduleResult = action.payload
    }
  }
})

export const { setSavingsGoalResult, setSavingsGoalScheduleResult } = savingsGoalCalculatorSlice.actions

export const savingsGoalCalculatorReducer = savingsGoalCalculatorSlice.reducer