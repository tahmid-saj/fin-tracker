import { createSelector } from "reselect";
import { RootState } from "../../store";
import { BankingState } from "./banking.reducer";

const selectBankingReducer = (state) => state.bankingSignedIn

export const selectBankingAccounts = createSelector(
  [selectBankingReducer],
  (bankingSignedIn) => bankingSignedIn.bankingAccounts
)

export const selectBankingSummary = createSelector(
  [selectBankingReducer],
  (bankingSignedIn) => bankingSignedIn.bankingSummary
)