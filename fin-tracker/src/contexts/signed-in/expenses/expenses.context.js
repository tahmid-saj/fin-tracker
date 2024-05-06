import { createContext, useState, useEffect } from "react";
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
  filterConditions: {},
  // filterConditions structure
  // {
  //   expenseFor: "",
  //   expenseCategory: "",
  //   expensesStartDate: "",
  //   expensesEndDate: "",
  // }

  // expensesView is the filtered version of expenses 
  expensesView: [],

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
  const [filterConditions, setFilterConditions] = useState(null)
  const [expensesView, setExpensesView] = useState(expenses)
  const [expensesSummary, setExpensesSummary] = useState({})

  // update expensesSummary
  useEffect(() => {
    const newAllExpensesCost = expenses.reduce((allExpensesCost, { expenseCost }) => {
      return allExpensesCost + expenseCost
    }, 0)

    const newAllExpensesCategories = expenses.reduce((allExpensesCategories, { expenseCategory }) => {
      allExpensesCategories.push(expenseCategory)
      return allExpensesCategories
    }, [])
    
    setExpensesSummary({
      currentAllExpensesCost: newAllExpensesCost,
      currentAllExpensesCategories: newAllExpensesCategories
    })
  }, [expenses])

  // update expensesView when expenses change
  useEffect(() => {
    if (filterConditions !== null) {
      setExpensesView(filterExpensesHelper(expenses, filterConditions))
    } else {
      setExpensesView(expenses)
    }
  }, [expenses, filterConditions])

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure expenseIds are not duplicate via validations
  const addExpense = (expense) => {
    if (validateAddExpense(expense)) {
      return
    } else {
      setExpenses(addExpenseHelper(expenses, expense, expenseLength + 1))
      setExpenseLength(expenseLength + 1)
      console.log("created")
    }
  }

  const filterExpenses = (filterConditions) => {
    if (validateFilterExpenses(filterConditions)) {
      console.log("invalid")
      return
    } else {
      setFilterConditions(filterConditions)
      setExpensesView(filterExpensesHelper(expenses, filterConditions))
      console.log("set")
    }
  }

  const removeExpense = (expenseId) => {
    setExpenses(removeExpenseHelper(expenses, expenseId))
  }

  const clearExpensesFilter = () => {
    setFilterConditions(null)
    setExpensesView(expenses)
  }

  const value = { expenses, expensesView, filterConditions,
                  addExpense, filterExpenses, removeExpense, clearExpensesFilter, 
                  expensesSummary }
  
  return (
    <ExpensesContext.Provider
      value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}