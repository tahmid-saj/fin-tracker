import { createSelector } from "reselect";

const selectExpensesReducer = state => state.expenses

export const selectExpenses = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.expenses
)

export const selectExpensesTagLimit = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.expensesTagLimit
)

export const selectFilterConditions = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.filterConditions
)

export const selectExpensesView = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.expensesView
)

export const selectExpensesSummary = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.expensesSummary
)