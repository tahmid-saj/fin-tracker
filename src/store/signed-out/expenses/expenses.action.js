import { createAction } from "../../../utils/reducer/reducer.utils";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";
import { EXPENSES_ACTION_TYPES } from "./expenses.types";

// helper functions

const addExpenseHelper = (expenses, expense, expenseId) => {
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

export const filterExpensesHelper = (expenses, filterConditions) => {
  console.log(filterConditions)

  let filteredExpenses = []
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

const removeExpenseHelper = (expenses, expenseId) => {
  if (validateRemoveExpense(expenseId)) return expenses

  return expenses.filter(exp => exp.expenseId !== expenseId)
}

// actions

export const addExpense = (expenses, expense, expensesTagLimit) => {
  if (validateAddExpense(expense)) {
    return
  } else {
    const newExpenses = addExpenseHelper(expenses, expense, expensesTagLimit)
    return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES, newExpenses)
  }
}

export const filterExpenses = (filterConditions) => {
  if (validateFilterExpenses(filterConditions)) {
    return
  } else {
    return createAction(EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, filterConditions)
  }
}

export const removeExpense = (expenses, expenseId) => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES, removeExpenseHelper(expenses, expenseId))
}

export const clearExpensesFilter = () => {
  return createAction(EXPENSES_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
}

export const setExpensesTagLimit = (expensesTagLimit) => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES_TAG_LIMIT, expensesTagLimit)
}

export const setExpensesView = (expensesView) => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES_VIEW, expensesView)
}

export const setExpensesSummary = (expensesSummary) => {
  return createAction(EXPENSES_ACTION_TYPES.SET_EXPENSES_SUMMARY, expensesSummary)
}