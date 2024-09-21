import { DocumentNode, gql } from "@apollo/client";

// graphql savings queries
export const SAVINGS_ACCOUNTS_BY_USER: DocumentNode = gql`
  query SavingsAccountsByUser($userId: String!, $email: String!) {
    savingsAccountsByUser(userId: $userId, email: $email) {
      savingsAccountName
      initialDeposit
      startDate
      monthlyContribution
      contributionPeriod
      contributionInterval
      apy

      totalSavings
      totalContribution
      totalInterest

      savings {
        currentDate
        interestEarned
        totalInterestEarned
        balance
      }
    }
  }
`

export const SAVINGS_ACCOUNTS_SUMMARY_BY_USER: DocumentNode = gql`
  query SavingsAccountsSummaryByUser($userId: String!, $email: String!) {
    currentAllSavingsAccountsBalance
    totalAllContribution
    totalAllInterest
  }
`

// graphql savings mutations
export const CREATE_USER_SAVINGS_ACCOUNT: DocumentNode = gql`
  mutation CreateUserSavingsAccount($userId: String!, $email: String!, $savingsAccountInfo: SavingsAccountInfo!) {
    CreateUserSavingsAccount(userId: $userId, email: $email, savingsAccountInfo: $savingsAccountInfo)
  }
`

export const UPDATE_USER_SAVINGS_ACCOUNT: DocumentNode = gql`
  mutation UpdateUserSavingsAccount($userId: String!, $email: String!, $savingsAccountInfoUpdate: SavingsAccountInfoUpdate!) {
    updateUserSavingsAccount(userId: $userId, email: $email, savingsAccountInfoUpdate: $savingsAccountInfoUpdate)
  }
`

export const DELETE_USER_SAVINGS_ACCOUNT: DocumentNode = gql`
  mutation DeleteUserSavingsAccount($userId: String!, $email: String!, $closingSavingsAccountName: String!) {
    deleteUserSavingsAccount(userId: $userId, email: $email, closingSavingsAccountName: $closingSavingsAccountName)
  }
`

export const UPDATE_USER_SAVINGS_ACCOUNTS: DocumentNode = gql`
  mutation UpdateUserSavingsAccounts($userId: String!, $email: String!, $savingsAccounts: [SavingsAccountInfo]!) {
    updateUserSavingsAccounts(userId: $userId, email: $email, savingsAccounts: $savingsAccounts)
  }
`

export const UPDATE_USER_SAVINGS_ACCOUNTS_SUMMARY: DocumentNode = gql`
  mutation UpdateUserSavingsAccountsSummary($userId: String!, $email: String!, $savingsAccountsSummary: SavingsAccountSummaryInfo!) {
    updateUserSavingsAccountsSummary(userId: $userId, email: $email, savingsAccountsSummary: $savingsAccountsSummary)
  }
`