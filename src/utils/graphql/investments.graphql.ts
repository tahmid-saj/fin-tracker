import { DocumentNode, gql } from "@apollo/client";

// graphql investments queries
export const INVESTMENTS_BY_USER: DocumentNode = gql`
  query InvestmentsByUser($userId: String!, $email: String!) {
    investmentsByUser(userId: $userId, email: $email) {
      investmentName
      investmentType
      startingAmount
      startDate
      afterYears
      returnRate
      compounded
      additionalContribution
      contributionAt
      contributionInterval

      endBalance
      totalContribution
      totalInterest

      investments {
        currentDate
        contribution
        interestAccumulated
        endingBalance
      }
    }
  }
`
export const INVESTMENTS_SUMMARY_BY_USER: DocumentNode = gql`
  query InvestmentsSummaryByUser($userId: String!, $email: String!) {
    investmentsSummaryByUser(userId: $userId, email: $email) {
      currentAllInvestmentsBalance
      totalAllContribution
      totalAllInterest
    }
  }
`

// graphql investments mutations
export const CREATE_USER_INVESTMENT: DocumentNode = gql`
  mutation CreateUserInvestment($userId: String!, $email: String!, $investmentInfo: InvestmentInfo!) {
    createUserInvestment(userId: $userId, email: $email, investmentInfo: $investmentInfo)
  }
`
export const UPDATE_USER_INVESTMENT: DocumentNode = gql`
  mutation UpdateUserInvestment($userId: String!, $email: String!, $investmentInfoUpdate: InvestmentInfoUpdate!) {
    updateUserInvestment(userId: $userId, email: $email, investmentInfoUpdate: $investmentInfoUpdate)
  }
`

export const DELETE_USER_INVESTMENT: DocumentNode = gql`
  mutation DeleteUserInvestment($userId: String!, $email: String!, $closingInvestmentName: String!) {
    deleteUserInvestment(userId: $userId, email: $email, closingInvestmentName: $closingInvestmentName)
  }
`

export const UPDATE_USER_INVESTMENTS: DocumentNode = gql`
  mutation UpdateUserInvestments($userId: String!, $email: String!, $investments: [InvestmentInfo]!) {
    updateUserInvestments(userId: $userId, email: $email, investments: $investments)
  }
`

export const UPDATE_USER_INVESTMENTS_SUMMARY: DocumentNode = gql`
  mutation UpdateUserInvestmentsSummary($userId: String!, $email: String!, $investmentsSummary: InvestmentSummaryInfo!) {
    updateUserInvestmentsSummary(userId: $userId, email: $email, investmentsSummary: $investmentsSummary)
  }
`