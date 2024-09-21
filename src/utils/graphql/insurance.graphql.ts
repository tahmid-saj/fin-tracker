import { DocumentNode, gql } from "@apollo/client"

// graphql insurance queries
export const INSURANCES_BY_USER: DocumentNode = gql`
  query InsurancesByUser($userId: String!, $email: String!) {
    insurancesByUser(userId: $userId, email: $email) {
      insuranceFor
      insurancePayment
      insuranceInterval
      insuranceFirstPaymentDate
      insuranceEndDate
    }
  }
`

export const INSURANCES_SUMMARY_BY_USER: DocumentNode = gql`
  query InsurancesSummaryByUser($userId: String!, $email: String!) {
    insurancesSummaryByUser(userId: $userId, email: $email) {
      currentTotalInsurancePlanned
    }
  }
`

// graphql insurance mutations
export const CREATE_USER_INSURANCE: DocumentNode = gql`
  mutation CreateUserInsurance($userId: String!, $email: String!, $insuranceInfo: InsuranceInfo!) {
    createUserInsurance(userId: $userId, email: $email, insuranceInfo: $insuranceInfo)
  }
`

export const DELETE_USER_INSURANCE: DocumentNode = gql`
  mutation DeleteUserInsurance($userId: String!, $email: String!, $removingInsuranceFor: String!) {
    deleteUserInsurance(userId: $userId, email: $email, removingInsuranceFor: $removingInsuranceFor)
  }
`

export const UPDATE_USER_INSURANCES: DocumentNode = gql`
  mutation UpdateUserInsurances($userId: String!, $email: String!, $insurances: [InsuranceInfo]!) {
    updateUserInsurances(userId: $userId, email: $email, insurances: $insurances)
  }
`

export const UPDATE_USER_INSURANCES_SUMMARY: DocumentNode = gql`
  mutation UpdateUserInsurancesSummary($userId: String!, $email: String!, $insurancesSummary: InsurancesSummaryInfo!) {
    updateUserInsurancesSummary(userId: $userId, email: $email, insurancesSummary: $insurancesSummary)
  }
`