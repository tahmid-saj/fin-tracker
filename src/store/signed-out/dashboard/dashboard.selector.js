import { createSelector } from "reselect";

const selectDashboardReducer = (state) => state.dashboard

export const selectSummaries = createSelector(
  [selectDashboardReducer],
  (dashboard) => dashboard.summaries
)

export const selectUserSummary = createSelector(
  [selectDashboardReducer],
  (dashboard) => dashboard.userSummary
)