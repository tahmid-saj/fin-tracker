import { createSlice } from "@reduxjs/toolkit";

export const BANKING_INITIAL_STATE = {
  bankingAccounts: [],
  bankingSummary: {}
}

export const bankingSlice = createSlice({
  name: "banking",
  initialState: BANKING_INITIAL_STATE,
  reducers: {
    setBankingAccounts(state, action) {
      state.bankingAccounts = action.payload
    },
    setBankingSummary(state, action) {
      state.bankingSummary = action.payload
    }
  }
})

export const { setBankingAccounts, setBankingSummary } = bankingSlice.actions

export const bankingReducer = bankingSlice.reducer