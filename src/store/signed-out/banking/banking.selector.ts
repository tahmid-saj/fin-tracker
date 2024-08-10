import { createSelector } from "reselect";
import { BankingState } from "./banking.reducer"
import { RootState } from "../../store";

const selectBankingReducer = (state: RootState): BankingState => state.banking

export const selectBankingAccounts = createSelector(
  [selectBankingReducer],
  (banking) => banking.bankingAccounts
)

export const selectBankingSummary = createSelector(
  [selectBankingReducer],
  (banking) => banking.bankingSummary
)