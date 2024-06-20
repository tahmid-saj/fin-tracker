import { EXPENSES_ACTION_TYPES } from "./expenses.types";

export const EXPENSES_INITIAL_STATE = {
  expenses: [],
  expensesTagLimit: 0,
  filterConditions: null,
  selectedExpensesDate: null,
  scheduledExpensesView: null,
  expensesView: [],
  expensesSummary: {}
}

export const expensesReducer = (state=EXPENSES_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case EXPENSES_ACTION_TYPES.SET_EXPENSES:
      return {
        ...state,
        expenses: payload
      }
    case EXPENSES_ACTION_TYPES.SET_EXPENSES_TAG_LIMIT:
      return {
        ...state,
        expensesTagLimit: payload
      }
    case EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS:
      return {
        ...state,
        filterConditions: payload
      }
    case EXPENSES_ACTION_TYPES.SET_SELECTED_EXPENSES_DATE:
      return {
        ...state,
        selectedExpensesDate: payload
      }
    case EXPENSES_ACTION_TYPES.SET_SCHEDULED_EXPENSES_VIEW:
      return {
        ...state,
        scheduledExpensesView: payload
      }
    case EXPENSES_ACTION_TYPES.SET_EXPENSES_VIEW:
      return {
        ...state,
        expensesView: payload
      }
    case EXPENSES_ACTION_TYPES.SET_EXPENSES_SUMMARY:
      return {
        ...state,
        expensesSummary: payload
      }
    default:
      return state
  }
}