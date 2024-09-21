import React, { createContext, useState, useEffect, FC } from "react";
import { validateAddExpense, validateFilterExpenses, validateRemoveExpense } from "../../../utils/validations/expenses.validation";

import { ExpensesContextType, ExpensesProviderProps, Expense, FilterConditions, ExpensesSummary } from "./expenses.types"

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

const removeExpenseHelper = (expenses: Expense[], expenseId: number): Expense[] => {
  if (validateRemoveExpense(expenseId)) return expenses

  return expenses.filter(exp => exp.expenseId !== expenseId)
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
  filterConditions: {} as FilterConditions,
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
  //   currentAllExpensesCategories: []
  //   pastMonthAllExpensesCost: 1000,
  //   pastMonthExpenses: []
  // }
})

// context component
export const ExpensesProvider: FC<ExpensesProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[] | []>([])
  const [expenseLength, setExpenseLength] = useState<number>(0)
  const [filterConditions, setFilterConditions] = useState<FilterConditions | null>(null)
  const [selectedExpensesDate, setSelectedExpensesDate] = useState<string | null>(null)
  const [scheduledExpensesView, setScheduledExpensesView] = useState<Expense[] | null>(null)
  const [expensesView, setExpensesView] = useState<Expense[] | null>(expenses)
  const [expensesSummary, setExpensesSummary] = useState<ExpensesSummary | {}>({})

  // update expensesSummary
  useEffect(() => {
    // let newAllExpensesCategories = []
    // const newAllExpensesCost = expenses.reduce((allExpensesCost, { expenseCost, expenseCategory }) => {
    //   newAllExpensesCategories.push(expenseCategory)
    //   return allExpensesCost + expenseCost
    // }, 0)
    
    // setExpensesSummary({
    //   currentAllExpensesCost: newAllExpensesCost,
    //   currentAllExpensesCategories: newAllExpensesCategories
    // })
    
    // past 30 days of expenses
    // Date.prototype.subtractDays = function (d: number) {
    //   this.setDate(this.getDate() - d);
    //   return this;
    // }

    // Helper function to subtract days
    const subtractDays = (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    };

    const past30Days = subtractDays(new Date(), 30);
    const today = new Date();

    let newAllExpensesCategories: string[] = []
    let newPastMonthExpenses: Expense[] = []
    let newPast30DaysAllExpensesCost: number = 0

    const newAllExpensesCost = expenses.reduce((allExpensesCost, expense) => {
      newAllExpensesCategories.push(expense.expenseCategory)
      
      if (Date.parse(expense.expenseDate) >= past30Days.getTime() && Date.parse(expense.expenseDate) <= today.getTime()) {
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

  // update expensesView when expenses change
  useEffect(() => {
    if (filterConditions !== null) {
      setExpensesView(filterExpensesHelper(expenses, filterConditions))
    } else {
      setExpensesView(expenses)
    }
  }, [expenses, filterConditions])

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
      setExpenses(addExpenseHelper(expenses, expense, expenseLength + 1))
      // setExpenseLength(expenseLength + 1)
      
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
    setExpenses(removeExpenseHelper(expenses, expenseId))
  }

  const clearExpensesFilter = () => {
    setFilterConditions(null)
    setExpensesView(expenses)
  }

  const selectScheduledExpenses = (expenseDate: string) => {
    setSelectedExpensesDate(expenseDate)
    setScheduledExpensesView(selectScheduledExpensesHelper(expenses, expenseDate))
  }

  const value = { expenses, expensesView, expenseLength, selectedExpensesDate, filterConditions, scheduledExpensesView,
                  addExpense, filterExpenses, removeExpense, clearExpensesFilter, 
                  expensesSummary, selectScheduledExpenses }
  
  return (
    <ExpensesContext.Provider
      value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}