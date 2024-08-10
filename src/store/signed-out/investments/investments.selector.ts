import { createSelector } from "reselect";
import { InvestmentsState } from "./investments.reducer";
import { RootState } from "../../store";

const selectInvestmentsReducer = (state: RootState): InvestmentsState => state.investments

export const selectInvestments = createSelector(
  [selectInvestmentsReducer],
  (investments) => investments.investments
)

export const selectInvestmentsSummary = createSelector(
  [selectInvestmentsReducer],
  (investments) => investments.investmentsSummary
)