import { createSelector } from "reselect";

const selectBankingReducer = (state) => state.bankingSignedIn

export const selectBankingAccounts = createSelector(
  [selectBankingReducer],
  (bankingSignedIn) => bankingSignedIn.bankingAccounts
)

export const selectBankingSummary = createSelector(
  [selectBankingReducer],
  (bankingSignedIn) => bankingSignedIn.bankingSummary
)