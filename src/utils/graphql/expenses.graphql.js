import { gql } from "@apollo/client";

// graphql expenses queries
export const EXPENSES_BY_USER = gql`
  query ExpensesByUser($userId: String!, $email: String!) {
    expensesByUser(userId: $userId, email: $email) {
      expenseFor
      expenseCost
      expenseDate
      expenseCategory
      expenseId
    }
  }
`

export const EXPENSES_SUMMARY_BY_USER = gql`
  query ExpensesSummaryByUser($userId: String!, $email: String!) {
    expensesSummaryByUser(userId: $userId, email: $email) {
      currentAllExpensesCost
    }
  }
`

// graphql expenses mutations
export const CREATE_USER_EXPENSES = gql`
  mutation CreateUserExpenses($userId: String!, $email: String!, $expenseInfo: ExpenseInfo!) {
    createUserExpenses(userId: $userId, email: $email, expenseInfo: $expenseInfo)
  }
`

export const DELETE_USER_EXPENSES = gql`
  mutation DeleteUserExpenses($userId: String!, $email: String!, $removingExpenseId: Int!) {
    deleteUserExpenses(userId: $userId, email: $email, removingExpenseId: $removingExpenseId)
  }
`

export const UPDATE_USER_EXPENSES = gql`
  mutation UpdateUserExpenses($userId: String!, $email: String!, $expenses: [Expense]!) {
    updateUserExpenses(userId: $userId, email: $email, expenses: $expenses)
  }
`

export const UPDATE_USER_EXPENSES_SUMMARY = gql`
  mutation UpdateUserExpensesSummary($userId: String!, $email: String!, $expensesSummary: ExpensesSummary!) {
    updateUserExpensesSummary(userId: $userId, email: $email, expensesSummary: $expensesSummary)
  }
`