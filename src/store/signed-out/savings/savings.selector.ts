import { createSelector } from "reselect";
import { SavingsState } from "./savings.reducer"

const selectSavingsReducer = (state): SavingsState => state.savings

export const selectSavingsAccounts = createSelector(
  [selectSavingsReducer],
  (savings) => savings.savingsAccounts
)

export const selectSavingsAccountsSummary = createSelector(
  [selectSavingsReducer],
  (savings) => savings.savingsAccountsSummary
)