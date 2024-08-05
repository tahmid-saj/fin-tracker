import { gql } from "@apollo/client";

// graphql banking queries
export const BANKING_ACCOUNTS_BY_USER = gql`
  query BankingAccountsByUser {
    bankingAccountsByUser(userId: "PjsZaVEVAsbet4R4QPUTGgqlKCs1", email: "tim@gmail.com") {
      currentBalance
    }
  }
`

export const BANKING_SUMMARY_BY_USER = gql`
  query BankingSummaryByUser($userId: String!, $email: String!) {
    bankingSummaryByUser(userId: $userId, email: $email) {
      currentAllBankingBalance
      totalAllBankingIn
      totalAllBankingOut
    }
  }
`

// graphql banking mutations
export const CREATE_USER_BANKING_ACCOUNT = gql`
  mutation CreateUserBankingAccount($userId: String!, $email: String!, $bankingAccountName: String!) {
    createUserBankingAccount(userId: $userId, email: $email, bankingAccountName: $bankingAccountName)
  }
`

export const UPDATE_USER_BANKING_ACCOUNT_TRANSACTION = gql`
  mutation UpdateUserBankingAccountTransaction($userId: String!, $email: String!, $transactionInfo: TransactionInfo!) {
    UpdateUserBankingAccountTransaction(userId: $userId, email: $email, transactionInfo: $transactionInfo)
  }
`

export const DELETE_USER_BANKING_ACCOUNT = gql`
  mutation DeleteUserBankingAccount($userId: String!, $email: String!, $bankingAccountName: String!) {
    deleteUserBankingAccount(userId: $userId, email: $email, bankingAccountName: $bankingAccountName)
  }
`

export const UPDATE_USER_BANKING_ACCOUNTS = gql`
  mutation UpdateUserBankingAccounts($userId: String!, $email: String!, $bankingAccounts: [BankingAccountInfo]!) {
    updateUserBankingAccounts(userId: $userId, email: $email, bankingAccounts: $bankingAccounts)
  }
`

export const UPDATE_USER_BANKING_SUMMARY = gql`
  mutation UpdateUserBankingSummary($userId: String!, $email: String!, $bankingSummary: BankingSummaryInfo!) {
    updateUserBankingSummary(userId: $userId, email: $email, bankingSummary: $bankingSummary)
  }
`