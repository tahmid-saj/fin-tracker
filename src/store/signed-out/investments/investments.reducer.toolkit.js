import { createSlice } from "@reduxjs/toolkit";

export const INVESTMENTS_INITIAL_STATE = {
  investments: [],
  investmentsSummary: {}
}

export const investmentsSlice = createSlice({
  name: "investments",
  initialState: INVESTMENTS_INITIAL_STATE,
  reducers: {
    setInvestments(state, action) {
      state.investments = action.payload
    },
    setInvestmentsSummary(state, action) {
      state.investmentsSummary = action.payload
    }
  }
})

export const { setInvestments, setInvestmentsSummary } = investmentsSlice.actions

export const investmentsReducer = investmentsSlice.reducer