import { createSelector } from "reselect";
import { ExpensesState } from "./expenses.reducer";
import { RootState } from "../../store";

const selectExpensesReducer = (state: RootState): ExpensesState => state.expenses

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

export const selectSelectedExpensesDate = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.selectedExpensesDate
)

export const selectScheduledExpensesView = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.scheduledExpensesView
)

export const selectExpensesView = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.expensesView
)

export const selectExpensesSummary = createSelector(
  [selectExpensesReducer],
  (expenses) => expenses.expensesSummary
)