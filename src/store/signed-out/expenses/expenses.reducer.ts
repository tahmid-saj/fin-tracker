import { AnyAction } from "redux";
import { Expense, EXPENSES_ACTION_TYPES, ExpensesSummary, FilterConditions } from "./expenses.types";
import { addExpense, clearExpensesFilter, filterExpenses, selectScheduledExpenses, setExpensesSummary, setExpensesTagLimit, setScheduledExpensesView } from "./expenses.action";

export type ExpensesState = {
  readonly expenses: Expense[] | null | undefined;
  readonly expensesTagLimit: number | null | undefined;
  readonly filterConditions: FilterConditions | null | undefined;
  readonly selectedExpensesDate: string | null | undefined;
  readonly scheduledExpensesView: Expense[] | null | undefined;
  readonly expensesView: Expense[] | null | undefined;
  readonly expensesSummary: ExpensesSummary | null | undefined;
}

export const EXPENSES_INITIAL_STATE: ExpensesState = {
  expenses: [],
  expensesTagLimit: 0,
  filterConditions: null,
  selectedExpensesDate: null,
  scheduledExpensesView: null,
  expensesView: [],
  expensesSummary: {}
}

export const expensesReducer = (state=EXPENSES_INITIAL_STATE, action: AnyAction): ExpensesState => {
  if (addExpense.match(action)) {
    return {
      ...state,
      expenses: action.payload
    }
  }

  if (setExpensesTagLimit.match(action)) {
    return {
      ...state,
      expensesTagLimit: action.payload
    }
  }

  if (filterExpenses.match(action) || clearExpensesFilter.match(action)) {
    return {
      ...state,
      filterConditions: action.payload
    }
  }

  if (selectScheduledExpenses.match(action)) {
    return {
      ...state,
      selectedExpensesDate: action.payload
    }
  }

  if (setScheduledExpensesView.match(action)) {
    return {
      ...state,
      expensesView: action.payload
    }
  }

  if (setExpensesSummary.match(action)) {
    return {
      ...state,
      expensesSummary: action.payload
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case EXPENSES_ACTION_TYPES.SET_EXPENSES:
  //     return {
  //       ...state,
  //       expenses: payload
  //     }
  //   case EXPENSES_ACTION_TYPES.SET_EXPENSES_TAG_LIMIT:
  //     return {
  //       ...state,
  //       expensesTagLimit: payload
  //     }
  //   case EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS:
  //     return {
  //       ...state,
  //       filterConditions: payload
  //     }
  //   case EXPENSES_ACTION_TYPES.SET_SELECTED_EXPENSES_DATE:
  //     return {
  //       ...state,
  //       selectedExpensesDate: payload
  //     }
  //   case EXPENSES_ACTION_TYPES.SET_SCHEDULED_EXPENSES_VIEW:
  //     return {
  //       ...state,
  //       scheduledExpensesView: payload
  //     }
  //   case EXPENSES_ACTION_TYPES.SET_EXPENSES_VIEW:
  //     return {
  //       ...state,
  //       expensesView: payload
  //     }
  //   case EXPENSES_ACTION_TYPES.SET_EXPENSES_SUMMARY:
  //     return {
  //       ...state,
  //       expensesSummary: payload
  //     }
  //   default:
  //     return state
  // }
}