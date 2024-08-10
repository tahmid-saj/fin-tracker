import { createSlice } from "@reduxjs/toolkit";
import { ExpensesState } from "./expenses.reducer";

export const EXPENSES_INITIAL_STATE: ExpensesState = {
  expenses: [],
  expensesTagLimit: 0,
  filterConditions: null,
  selectedExpensesDate: null,
  scheduledExpensesView: null,
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