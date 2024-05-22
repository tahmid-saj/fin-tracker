import { createSelector } from "reselect";

const selectBankingReducer = state => state.banking

export const selectBankingAccounts = createSelector(
  [selectBankingReducer],
  (banking) => banking.bankingAccounts
)

export const selectBankingSummary = createSelector(
  [selectBankingReducer],
  (banking) => banking.bankingSummary
)