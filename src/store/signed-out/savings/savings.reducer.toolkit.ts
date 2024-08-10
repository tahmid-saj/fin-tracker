import { createSlice } from "@reduxjs/toolkit";
import { SavingsState } from "./savings.reducer";

export const SAVINGS_INITIAL_STATE: SavingsState = {
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