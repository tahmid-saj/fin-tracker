import { createSelector } from "reselect";
import { SavingsState } from "./savings.reducer"
import { RootState } from "../../store";

const selectSavingsReducer = (state: RootState): SavingsState => state.savings

export const selectSavingsAccounts = createSelector(
  [selectSavingsReducer],
  (savings) => savings.savingsAccounts
)

export const selectSavingsAccountsSummary = createSelector(
  [selectSavingsReducer],
  (savings) => savings.savingsAccountsSummary
)