import { createSelector } from "reselect";
import { DashboardState } from "./dashboard.reducer";

const selectDashboardReducer = (state): DashboardState => state.dashboard

export const selectSummaries = createSelector(
  [selectDashboardReducer],
  (dashboard) => dashboard.summaries
)

export const selectUserSummary = createSelector(
  [selectDashboardReducer],
  (dashboard) => dashboard.userSummary
)