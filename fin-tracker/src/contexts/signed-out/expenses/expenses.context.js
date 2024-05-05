import { createContext, useState, useEffect, Children } from "react";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";

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

const filterExpensesHelper = (expenses, filterConditions) => {
  if (validateFilterExpenses(filterConditions)) return expenses

  return expenses.filter((expense) => {
    return ((!filterConditions.expenseFor || (filterConditions.expenseFor === expense.expenseFor))
      && (!filterConditions.expenseCategory || (filterConditions.expenseCategory === expense.expenseCategory))
      && (!filterConditions.expensesStartDate || (filterConditions.expensesStartDate <= expense.expenseDate))
      && (!filterConditions.expenseEndDate || (filterConditions.expensesEndDate >= expense.expenseDate )))
  })
}

const removeExpenseHelper = (expenses, expenseId) => {
  if (validateRemoveExpense(expenseId)) return expenses

  return expenses.filter(exp => exp.expenseId !== expenseId)
}

// initial state
export const ExpensesContext = createContext({
  expenses: [],
  // expenses structure:
  // [
  //   {
  //     expenseFor: "grocery",
  //     expenseCost: 50,
  //     expenseDate: new Date(),
  //     expenseCategory: "food",
  //     expenseId: 0
  //   }
  // ]
  expenseLength: 0,

  addExpense: () => {},
  filterExpenses: () => {},
  removeExpense: () => {},

  expensesSummary: {},
  // expensesSummary structure:
  // {
  //   currentAllExpensesCost: 2000,
  //   currentAllExpensesCategories: []
  // }
})

// context component
export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([])
  const [expenseLength, setExpenseLength] = useState(0)
  const [expensesSummary, setExpensesSummary] = useState({})

  useEffect(() => {
    const newAllExpensesCost = expenses.reduce((allExpensesCost, { expensesCost }) => {
      return allExpensesCost + expensesCost
    }, 0)

    const newAllExpensesCategories = expenses.reduce((allExpensesCategories, { expenseCategory }) => {
      allExpensesCategories.push(expenseCategory)
      return allExpensesCategories
    }, [])
    
    setExpensesSummary({
      currentAllExpensesCost: newAllExpensesCost,
      currentAlllExpensesCategories: newAllExpensesCategories
    })
  }, [expenses])

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure expenseIds are not duplicate via validations
  const addExpense = (expense) => {
    if (validateAddExpense(expense)) {
      return
    } else {
      setExpenses(addExpenseHelper(expenses, expense, expenseLength + 1))
      setExpenseLength(expenseLength + 1)
    }
  }

  const filterExpenses = (filterConditions) => {
    return filterExpensesHelper(expenses, filterConditions)
  }

  const removeExpense = (expenseId) => {
    setExpenses(removeExpenseHelper(expenses, expenseId))
  }

  const value = { expenses, addExpense, filterExpenses, 
                  removeExpense, expensesSummary }
  
  return (
    <ExpensesContext.Provider
      value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}