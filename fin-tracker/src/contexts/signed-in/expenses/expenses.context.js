import { createContext, useState, useEffect, useContext } from "react";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";

import { DEFAULT_EXPENSES, DEFAULT_EXPENSES_SUMMARY } from "../../../utils/constants/expenses.constants"

import { UserContext } from "../../shared/user/user.context";

import { getExpensesData, getExpensesSummaryData,
  postExpenseCreate, deleteExpense,
  putExpensesData, putExpensesSummaryData
 } from "../../../utils/api-requests/expenses.requests";

// helper functions
const addExpenseHelper = (expenses, expense, expenseId, userId, email) => {
  postExpenseCreate(userId, email, expense, expenseId)

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

const removeExpenseHelper = (expenses, expenseId, userId, email) => {
  deleteExpense(userId, email, expenseId)

  if (validateRemoveExpense(expenseId)) return expenses

  return expenses.filter(exp => exp.expenseId !== expenseId)
}

// set default expenses values
const setDefaultExpensesValuesHelper = () => {
  return DEFAULT_EXPENSES
}

// set default expenses summary values
const setDefaultExpensesSummaryValuesHelper = () => {
  return DEFAULT_EXPENSES_SUMMARY
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
  //   currentAllExpensesCategories: [],
  //   pastMonthAllExpensesCost: 1000,
  //   pastMonthExpenses: []
  // }

  // signing out
  setDefaultExpensesValues: () => {},
  setDefaultExpensesSummaryValues: () => {},
  updateExpensesAndSummary: () => {}
})

// context component
export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([])
  const [expenseLength, setExpenseLength] = useState(0)
  const [filterConditions, setFilterConditions] = useState(null)
  const [expensesView, setExpensesView] = useState(expenses)
  const [expensesSummary, setExpensesSummary] = useState({})

  const { currentUser } = useContext(UserContext)

  // update expensesSummary
  useEffect(() => {
    Date.prototype.subtractDays = function (d) {
        this.setDate(this.getDate() - d);
        return this;
    }
    let past30Days = new Date()
    let today = new Date()
    past30Days.subtractDays(30)
    console.log(past30Days)

    let newAllExpensesCategories = []
    let newPastMonthExpenses = []
    let newPast30DaysAllExpensesCost = 0

    const newAllExpensesCost = expenses.reduce((allExpensesCost, expense) => {
      newAllExpensesCategories.push(expense.expenseCategory)
      if (Date.parse(expense.expenseDate) >= past30Days && Date.parse(expense.expenseDate) <= today) {
        newPast30DaysAllExpensesCost += expense.expenseCost
        newPastMonthExpenses.push(expense)
      }

      return allExpensesCost + expense.expenseCost
    }, 0)
    
    setExpensesSummary({
      currentAllExpensesCost: newAllExpensesCost,
      currentAllExpensesCategories: newAllExpensesCategories,
      pastMonthAllExpensesCost: newPast30DaysAllExpensesCost,
      pastMonthExpenses: newPastMonthExpenses
    })
  }, [expenses])

  // update expensesView when expenses or filterConditions change
  useEffect(() => {
    if (filterConditions !== null) {
      setExpensesView(filterExpensesHelper(expenses, filterConditions))
    } else {
      setExpensesView(expenses)
    }
  }, [expenses, filterConditions])

  // update expenses and expensesSummary if currentUser changes
  useEffect(() => {
    async function fetchExpensesData() {
      if (currentUser) {
        const expensesData = await getExpensesData(currentUser.uid, currentUser.email)
        const expensesSummaryData = await getExpensesSummaryData(currentUser.uid, currentUser.email)

        if (expensesData) {
          const { expenses } = await expensesData
          setExpenses(expenses)
        }

        if (expensesSummaryData) {
          const { expensesSummary: expSummary } = await expensesSummaryData
          setExpensesSummary({
            ...expensesSummary,
            currentAllExpensesCost: expSummary.currentAllExpensesCost
          })
        }
      } else if (!currentUser) {
        setDefaultExpensesValues()
        setDefaultExpensesSummaryValues()
      }
    }
    fetchExpensesData()
  }, [currentUser])

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure expenseIds are not duplicate via validations
  const addExpense = (expense) => {
    if (validateAddExpense(expense)) {
      return
    } else {
      setExpenses(addExpenseHelper(expenses, expense, expenseLength + 1, currentUser.uid, currentUser.email))
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
    setExpenses(removeExpenseHelper(expenses, expenseId, currentUser.uid, currentUser.email))
  }

  const clearExpensesFilter = () => {
    setFilterConditions(null)
    setExpensesView(expenses)
  }

  // set default expenses values
  const setDefaultExpensesValues = () => {
    setExpenses(setDefaultExpensesValuesHelper())
  }

  // set default expenses summary values
  const setDefaultExpensesSummaryValues = () => {
    setExpensesSummary(setDefaultExpensesSummaryValuesHelper())
  }

  // update expenses and summary on sign out
  const updateExpensesAndSummary = () => {
    putExpensesData(currentUser.uid, currentUser.email, expenses)
    putExpensesSummaryData(currentUser.uid, currentUser.email, {
      currentAllExpensesCost: expensesSummary.currentAllExpensesCost
    })
  }

  const value = { expenses, expensesView, filterConditions,
                  addExpense, filterExpenses, removeExpense, clearExpensesFilter, expensesSummary, 
                  setDefaultExpensesValues, setDefaultExpensesSummaryValues, updateExpensesAndSummary }
  
  return (
    <ExpensesContext.Provider
      value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}