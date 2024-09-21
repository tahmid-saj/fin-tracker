import { createAction, withMatcher } from "../../../utils/reducer/reducer.utils";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";
import { EXPENSES_ACTION_TYPES, Expense, FilterConditions, ExpensesSummary } from "./expenses.types";
import { ActionWithPayload } from "../../../utils/reducer/reducer.utils"

export type AddExpense = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_EXPENSES, Expense[]>
export type FilterExpenses = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, FilterConditions | null>
export type RemoveExpense = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_EXPENSES, Expense[]>
export type ClearExpensesFilter = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, null>
export type SetExpensesTagLimit = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_EXPENSES_TAG_LIMIT, number>
export type SetExpensesView = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_EXPENSES_VIEW, Expense[]>
export type SetExpensesSummary = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_EXPENSES_SUMMARY, ExpensesSummary>
export type SelectScheduledExpenses = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_SELECTED_EXPENSES_DATE, string>
export type SetScheduledExpensesView = ActionWithPayload<EXPENSES_ACTION_TYPES.SET_SCHEDULED_EXPENSES_VIEW, Expense[] | null>

// helper functions

const addExpenseHelper = (expenses: Expense[], expense: Expense, expenseId: number): Expense[] => {
  return [ ...expenses,
    {
      expenseFor: String(expense.expenseFor),
      expenseCost: Number(expense.expenseCost),
      expenseDate: String(expense.expenseDate),
      expenseCategory: String(expense.expenseCategory),
      expenseId: Number(expenseId)
    }
  ]
}

export const filterExpensesHelper = (expenses: Expense[], filterConditions: FilterConditions): Expense[] => {  
  let filteredExpenses: Expense[] = []
  expenses.map((expense) => {
    if (filterConditions.expenseFor === "" || (expense.expenseFor.toLowerCase().includes(filterConditions.expenseFor.toLowerCase()))) {
      if (filterConditions.expenseCategory === "" || (expense.expenseCategory.toLowerCase().includes(filterConditions.expenseCategory.toLowerCase()))) {
        if (filterConditions.expensesStartDate === "" || (filterConditions.expensesStartDate <= expense.expenseDate)) {
          if (filterConditions.expensesEndDate === "" || (filterConditions.expensesEndDate >= expense.expenseDate)) {
            filteredExpenses.push(expense)
          }
        }
      }
    }
  })

  return filteredExpenses
}

const removeExpenseHelper = (expenses: Expense[], expenseId: number): Expense[] => {
  if (validateRemoveExpense(expenseId)) return expenses

  return expenses.filter(exp => exp.expenseId !== expenseId)
}

export const selectScheduledExpensesHelper = (expenses: Expense[], expenseDate: string): Expense[] | null => {

  const filteredExpenses = expenses.filter((expense) => {
    return expense.expenseDate === expenseDate
  })

  if (!filteredExpenses) return null

  return filteredExpenses
}

// actions

export const addExpense = withMatcher((expenses: Expense[], expense: Expense, expensesTagLimit: number): AddExpense => {
  if (validateAddExpense(expense)) {
    return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES, expenses)
  } else {
    const newExpenses = addExpenseHelper(expenses, expense, expensesTagLimit)
    return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES, newExpenses)
  }
})

export const filterExpenses = withMatcher((filterConditions: FilterConditions): FilterExpenses => {
  if (validateFilterExpenses(filterConditions)) {
    return createAction(EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
  } else {
    return createAction(EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, filterConditions)
  }
})

export const removeExpense = withMatcher((expenses: Expense[], expenseId: number): RemoveExpense => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES, removeExpenseHelper(expenses, expenseId))
})

export const clearExpensesFilter = withMatcher((): ClearExpensesFilter => {
  return createAction(EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
})

export const setExpensesTagLimit = withMatcher((expensesTagLimit: number): SetExpensesTagLimit => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES_TAG_LIMIT, expensesTagLimit)
})

export const setExpensesView = withMatcher((expensesView: Expense[]): SetExpensesView => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES_VIEW, expensesView)
})

export const setExpensesSummary = withMatcher((expensesSummary: ExpensesSummary): SetExpensesSummary => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES_SUMMARY, expensesSummary)
})

export const selectScheduledExpenses = withMatcher((expenseDate: string): SelectScheduledExpenses => {
  return createAction(EXPENSES_ACTION_TYPES.SET_SELECTED_EXPENSES_DATE, expenseDate)
})

export const setScheduledExpensesView = withMatcher((scheduledExpensesView: Expense[] | null): SetScheduledExpensesView => {
  return createAction(EXPENSES_ACTION_TYPES.SET_SCHEDULED_EXPENSES_VIEW, scheduledExpensesView)
})