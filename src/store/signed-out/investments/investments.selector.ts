import { createSelector } from "reselect";
import { InvestmentsState } from "./investments.reducer";

const selectInvestmentsReducer = (state): InvestmentsState => state.investments

export const selectInvestments = createSelector(
  [selectInvestmentsReducer],
  (investments) => investments.investments
)

export const selectInvestmentsSummary = createSelector(
  [selectInvestmentsReducer],
  (investments) => investments.investmentsSummary
)