import React, { createContext, useState, useEffect, FC } from "react";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";

import { DEFAULT_EXPENSES, DEFAULT_EXPENSES_SUMMARY } from "../../../utils/constants/expenses.constants"

import { getExpensesData, getExpensesSummaryData,
  postExpenseCreate, deleteExpense,
  putExpensesData, putExpensesSummaryData
} from "../../../utils/api-requests/expenses.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";
import { Expense, ExpensesContextType, ExpensesProviderProps, ExpensesSummary, FilterConditions } from "./expenses.types";

// helper functions
const addExpenseHelper = (expenses: Expense[], expense: Expense, expenseId: number, 
  userId: string | null | undefined, email: string | null | undefined): Expense[] => {
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

const filterExpensesHelper = (expenses: Expense[], filterConditions: FilterConditions): Expense[] => {

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

const removeExpenseHelper = (expenses: Expense[], expenseId: number, 
  userId: string | null | undefined, email: string | null | undefined): Expense[] => {
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

const selectScheduledExpensesHelper = (expenses: Expense[], expenseDate: string): Expense[] | null => {

  const filteredExpenses = expenses.filter((expense) => {
    return expense.expenseDate === expenseDate
  })

  if (!filteredExpenses) return null

  return filteredExpenses
}

// initial state
export const ExpensesContext = createContext<ExpensesContextType>({
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
  filterConditions: null,
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

  expensesSummary: null,
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
export const ExpensesProvider: FC<ExpensesProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[] | []>([])
  const [expenseLength, setExpenseLength] = useState<number>(0)
  const [filterConditions, setFilterConditions] = useState<FilterConditions | null>(null)
  const [selectedExpensesDate, setSelectedExpensesDate] = useState<string | null>(null)
  const [scheduledExpensesView, setScheduledExpensesView] = useState<Expense[] | null>(null)
  const [expensesView, setExpensesView] = useState<Expense[] | []>(expenses)
  const [expensesSummary, setExpensesSummary] = useState<ExpensesSummary | null>(null)

  const currentUser = useSelector(selectCurrentUser)

  // update expensesSummary
  useEffect(() => {
    // Extend Date prototype to add a subtractDays method
    const subtractDays = (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    };

    const past30Days = subtractDays(new Date(), 30);
    const today = new Date();
  
    let newAllExpensesCategories: string[] = [];
    let newPastMonthExpenses: Expense[] = [];
    let newPast30DaysAllExpensesCost = 0;
  
    const newAllExpensesCost = expenses.reduce((allExpensesCost: number, expense: Expense) => {
      newAllExpensesCategories.push(expense.expenseCategory);
      const expenseDate = Date.parse(expense.expenseDate);
      
      if (expenseDate >= past30Days.getTime() && expenseDate <= today.getTime()) {
        newPast30DaysAllExpensesCost += expense.expenseCost;
        newPastMonthExpenses.push(expense);
      }
  
      return allExpensesCost + expense.expenseCost;
    }, 0);
  
    setExpensesSummary({
      currentAllExpensesCost: newAllExpensesCost,
      currentAllExpensesCategories: newAllExpensesCategories,
      pastMonthAllExpensesCost: newPast30DaysAllExpensesCost,
      pastMonthExpenses: newPastMonthExpenses
    });
  
    setExpenseLength(expenses.length);
  }, [expenses]);

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
  const addExpense = (expense: Expense) => {
    if (validateAddExpense(expense)) {
      return
    } else {
      if (currentUser) {
        setExpenses(addExpenseHelper(expenses, expense, expenseLength + 1, currentUser.uid, currentUser.email))
        // setExpenseLength(expenseLength + 1)
      }
    }
  }

  const filterExpenses = (filterConditions: FilterConditions) => {
    if (validateFilterExpenses(filterConditions)) {
      
      return
    } else {
      setFilterConditions(filterConditions)
      setExpensesView(filterExpensesHelper(expenses, filterConditions))
    }
  }

  const removeExpense = (expenseId: number) => {
    if (currentUser) {
      setExpenses(removeExpenseHelper(expenses, expenseId, currentUser.uid, currentUser.email))
    }
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
    if (currentUser) {
      putExpensesData(currentUser.uid, currentUser.email, expenses)
  
      // TODO: double check summary portion
      putExpensesSummaryData(currentUser.uid, currentUser.email, expensesSummary)
    }
  }

  const selectScheduledExpenses = (expenseDate: string) => {
    setSelectedExpensesDate(expenseDate)
    setScheduledExpensesView(selectScheduledExpensesHelper(expenses, expenseDate))
  }

  const value = { expenses, expensesView, filterConditions, scheduledExpensesView, expenseLength, selectedExpensesDate,
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