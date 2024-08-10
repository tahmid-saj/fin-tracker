import { createSelector } from "reselect";
import { BankingState } from "./banking.reducer"

const selectBankingReducer = (state): BankingState => state.banking

export const selectBankingAccounts = createSelector(
  [selectBankingReducer],
  (banking) => banking.bankingAccounts
)

export const selectBankingSummary = createSelector(
  [selectBankingReducer],
  (banking) => banking.bankingSummary
)