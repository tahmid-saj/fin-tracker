import { createContext, useState, useEffect } from "react";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";

import { DEFAULT_EXPENSES, DEFAULT_EXPENSES_SUMMARY } from "../../../utils/constants/expenses.constants"

import { getExpensesData, getExpensesSummaryData,
  postExpenseCreate, deleteExpense,
  putExpensesData, putExpensesSummaryData
} from "../../../utils/api-requests/expenses.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

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
  if (validateRemoveExpense(expenseId)) return expenses
  
  deleteExpense(userId, email, expenseId)

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

const selectScheduledExpensesHelper = (expenses, expenseDate) => {
  
  

  const filteredExpenses = expenses.filter((expense) => {
    return expense.expenseDate === expenseDate
  })

  if (!filteredExpenses) return null

  return filteredExpenses
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

  // selectedExpensesDate is the selected date from the calendar component
  selectedExpensesDate: null,

  // expensesView is the filtered version of expenses 
  expensesView: [],

  // scheduledExpensesView is the selected selectedExpensesDate info from the calendar component
  scheduledExpensesView: null,

  addExpense: () => {},
  filterExpenses: () => {},
  removeExpense: () => {},

  selectScheduledExpenses: () => {},

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
  const [selectedExpensesDate, setSelectedExpensesDate] = useState(null)
  const [scheduledExpensesView, setScheduledExpensesView] = useState(null)
  const [expensesView, setExpensesView] = useState(expenses)
  const [expensesSummary, setExpensesSummary] = useState({})

  const currentUser = useSelector(selectCurrentUser)

  // update expensesSummary
  useEffect(() => {
    Date.prototype.subtractDays = function (d) {
        this.setDate(this.getDate() - d);
        return this;
    }
    let past30Days = new Date()
    let today = new Date()
    past30Days.subtractDays(30)
    

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

    setExpenseLength(expenses.length)
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

  // update scheduledExpensesView when expenses or selectedExpensesDate change
  useEffect(() => {
    if (selectedExpensesDate) {
      setScheduledExpensesView(selectScheduledExpensesHelper(expenses, selectedExpensesDate))
    } else {
      setScheduledExpensesView(null)
    }
  }, [expenses, selectedExpensesDate])

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure expenseIds are not duplicate via validations
  const addExpense = (expense) => {
    if (validateAddExpense(expense)) {
      return
    } else {
      setExpenses(addExpenseHelper(expenses, expense, expenseLength + 1, currentUser.uid, currentUser.email))
      // setExpenseLength(expenseLength + 1)
      
    }
  }

  const filterExpenses = (filterConditions) => {
    if (validateFilterExpenses(filterConditions)) {
      
      return
    } else {
      setFilterConditions(filterConditions)
      setExpensesView(filterExpensesHelper(expenses, filterConditions))
      
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

    // TODO: double check summary portion
    putExpensesSummaryData(currentUser.uid, currentUser.email, {
      currentAllExpensesCost: expensesSummary.currentAllExpensesCost
    })
  }

  const selectScheduledExpenses = (expenseDate) => {
    setSelectedExpensesDate(expenseDate)
    setScheduledExpensesView(selectScheduledExpensesHelper(expenses, expenseDate))
  }

  const value = { expenses, expensesView, filterConditions, scheduledExpensesView,
                  addExpense, filterExpenses, removeExpense, clearExpensesFilter, expensesSummary, 
                  setDefaultExpensesValues, setDefaultExpensesSummaryValues, updateExpensesAndSummary,
                  selectScheduledExpenses }
  
  return (
    <ExpensesContext.Provider
      value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}