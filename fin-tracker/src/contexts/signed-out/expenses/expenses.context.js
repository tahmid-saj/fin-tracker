import { createContext, useState, useEffect, Children } from "react";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";

// helper functions
const addExpenseHelper = (expenses, expense) => {
  if (validateAddExpense(expense)) return expenses

  return [ ...expenses,
    {
      expenseFor: String(expense.expenseFor),
      expenseCost: Number(expense.expenseCost),
      expenseDate: String(expense.expenseDate),
      expenseCategory: String(expense.expenseCategory)
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

const removeExpenseHelper = (expenses, expense) => {
  if (validateRemoveExpense(expense)) return expenses

  return expenses.filter((exp) => {
    return exp.expenseFor !== expense.expenseFor && exp.expenseCost !== expense.expenseCost
    && exp.expenseDate !== expense.expenseDate && exp.expenseCategory !== expense.expenseCategory
  })
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
  //     expenseCategory: "food"
  //   }
  // ]
  

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

  const addExpense = (expense) => {
    setExpenses(addExpenseHelper(expenses, expense))
  }

  const filterExpenses = (filterConditions) => {
    return filterExpensesHelper(expenses, filterConditions)
  }

  const removeExpense = (expense) => {
    setExpenses(removeExpenseHelper(expenses, expense))
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