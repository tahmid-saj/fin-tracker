import { createSelector } from "reselect";

const selectInvestmentsReducer = state => state.investments

export const selectInvestments = createSelector(
  [selectInvestmentsReducer],
  (investments) => investments.investments
)

export const selectInvestmentsSummary = createSelector(
  [selectInvestmentsReducer],
  (investments) => investments.investmentsSummary
)