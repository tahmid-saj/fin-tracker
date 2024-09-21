import { errorOnGetExpensesData, errorOnGetExpensesSummaryData,
  errorOnExpenseCreate, errorOnExpenseRemove,
  errorOnPutExpensesData, errorOnPutExpensesSummaryData
 } from "../errors/expenses.error"

import { Expense, ExpensesSummary } from "../../contexts/signed-in/expenses/expenses.types"

// expenses api requests

// getting expenses and summary data on sign in
export const getExpensesData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    
    errorOnGetExpensesData()
  }
}

export const getExpensesSummaryData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES_SUMMARY}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    
    errorOnGetExpensesSummaryData()
  }
}

// expenses operations
export const postExpenseCreate = async (userId: string | null | undefined, email: string | null | undefined, expense: Expense, expenseId: number): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expenseFor: expense.expenseFor,
        expenseCost: expense.expenseCost,
        expenseDate: expense.expenseDate,
        expenseCategory: expense.expenseCategory,
        expenseId: expenseId
      })
    })

    return response.status
  } catch (error) {
    
    errorOnExpenseCreate()
  }
}

export const deleteExpense = async (userId: string | null | undefined, email: string | null | undefined, expenseId: number): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(expenseId)
    })

    return response.status
  } catch (error) {
    
    errorOnExpenseRemove()
  }
}

// updating expenses and summary data on sign out
export const putExpensesData = async (userId: string | null | undefined, email: string | null | undefined, expenses: Expense[]): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        expenses: expenses
      })
    })

    return response.status
  } catch (error) {
    
    errorOnPutExpensesData()
  }
}

export const putExpensesSummaryData = async (userId: string | null | undefined, email: string | null | undefined, expensesSummary: ExpensesSummary | null): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES_SUMMARY}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        expensesSummary: expensesSummary
      })
    })

    return response.status
  } catch (error) {
    
    errorOnPutExpensesSummaryData()
  }
}
