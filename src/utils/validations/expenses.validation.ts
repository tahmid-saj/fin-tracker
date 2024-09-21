import { Expense, FilterConditions } from "../../contexts/signed-in/expenses/expenses.types";
import { REGEX_PATTERNS } from "../constants/regex.constants";
import { errorOnInvalidExpenseForAndCategory, errorOnInvalidExpenseCost,
  errorOnStartDateBeforeEndDate
 } from "../errors/expenses.error"

// expenses validation functions

// TODO: include underscores to be approved
export const validateAddExpense = (expense: Expense): boolean => {
  // validating if expenseFor and expenseCategory are valid
  if ((expense.expenseFor && !(REGEX_PATTERNS.names.test(String(expense.expenseFor)))) || 
    (expense.expenseCategory && !(REGEX_PATTERNS.names.test(String(expense.expenseCategory))))) {
    errorOnInvalidExpenseForAndCategory()
    return true;
  }

  // validating if expenseCost is valid
  if (!(REGEX_PATTERNS.floatNumbers.test(String(expense.expenseCost))) || Number(expense.expenseCost) < 0) {
    errorOnInvalidExpenseCost()
    return true
  }

  return false
}

export const validateFilterExpenses = (filterConditions: FilterConditions): boolean => {
  // validating if expenseFor and expenseCategory are valid
  if ((filterConditions.expenseFor && !(REGEX_PATTERNS.names.test(String(filterConditions.expenseFor)))) || 
    (filterConditions.expenseCategory && !(REGEX_PATTERNS.names.test(String(filterConditions.expenseCategory))))) {
    errorOnInvalidExpenseForAndCategory()
    return true
  }

  // validating if startDate > endDate
  if (filterConditions.expensesStartDate && filterConditions.expensesEndDate && filterConditions.expensesStartDate > filterConditions.expensesEndDate) {
    errorOnStartDateBeforeEndDate()
    return true
  }

  return false
}

export const validateRemoveExpense = (expenseId: number): boolean => {
  return false
}