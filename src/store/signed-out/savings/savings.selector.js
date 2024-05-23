import { createSelector } from "reselect";

const selectSavingsReducer = state => state.savings

export const selectSavingsAccounts = createSelector(
  [selectSavingsReducer],
  (savings) => savings.savingsAccounts
)

export const selectSavingsAccountsSummary = createSelector(
  [selectSavingsReducer],
  (savings) => savings.savingsAccountsSummary
)