import { createSlice } from "@reduxjs/toolkit";

export const SAVINGS_INITIAL_STATE = {
  savingsAccounts: [],
  savingsAccountsSummary: {}
}

export const savingsSlice = createSlice({
  name: "savings",
  initialState: SAVINGS_INITIAL_STATE,
  reducers: {
    setSavingsAccounts(state, action) {
      state.savingsAccounts = action.payload
    },
    setSavingsAccountsSummary(state, action) {
      state.savingsAccountsSummary = action.payload
    }
  }
})

export const { setSavingsAccounts, setSavingsAccountsSummary } = savingsSlice.actions

export const savingsReducer = savingsSlice.reducer