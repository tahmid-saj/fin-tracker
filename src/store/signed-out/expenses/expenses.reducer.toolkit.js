import { createSlice } from "@reduxjs/toolkit";

export const EXPENSES_INITIAL_STATE = {
  expenses: [],
  expensesTagLimit: 0,
  filterConditions: null,
  expensesView: [],
  expensesSummary: {}
}

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: EXPENSES_INITIAL_STATE,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload
    },
    setExpensesTagLimit(state, action) {
      state.expensesTagLimit = action.payload
    },
    setFilterConditions(state, action) {
      state.filterConditions = action.payload
    },
    setExpensesView(state, action) {
      state.expensesView = action.payload
    },
    setExpensesSummary(state, action) {
      state.expensesSummary = action.payload
    }
  }
})

export const { setExpenses, setExpensesTagLimit, setFilterConditions, setExpensesView, setExpensesSummary } = expensesSlice.actions

export const expensesReducer = expensesSlice.reducer