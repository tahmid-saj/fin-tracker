import { errorOnGetExpensesData, errorOnGetExpensesSummaryData,
  errorOnExpenseCreate, errorOnExpenseRemove,
  errorOnPutExpensesData, errorOnPutExpensesSummaryData
 } from "../errors/expenses.error"

// expenses api requests

// getting expenses and summary data on sign in
export const getExpensesData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    console.log(error)
    errorOnGetExpensesData()
  }
}

export const getExpensesSummaryData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_EXPENSES_SUMMARY}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES_SUMMARY}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    console.log(error)
    errorOnGetExpensesSummaryData()
  }
}

// expenses operations
export const postExpenseCreate = async (userId, email, expense, expenseId) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_EXPENSE_CREATE}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_EXPENSE_CREATE}`, {
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
    console.log(error)
    errorOnExpenseCreate()
  }
}

export const deleteExpense = async (userId, email, expenseId) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_EXPENSE_REMOVE}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_EXPENSE_REMOVE}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(expenseId)
    })

    return response.status
  } catch (error) {
    console.log(error)
    errorOnExpenseRemove()
  }
}

// updating expenses and summary data on sign out
export const putExpensesData = async (userId, email, expenses) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_EXPENSES}/${userId}/${email}`)
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
    console.log(error)
    errorOnPutExpensesData()
  }
}

export const putExpensesSummaryData = async (userId, email, expensesSummary) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_EXPENSES_SUMMARY}/${userId}/${email}`)
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
    console.log(error)
    errorOnPutExpensesSummaryData()
  }
}
