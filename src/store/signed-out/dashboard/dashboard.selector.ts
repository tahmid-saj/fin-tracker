import { createSelector } from "reselect";
import { DashboardState } from "./dashboard.reducer";
import { RootState } from "../../store";

const selectDashboardReducer = (state: RootState): DashboardState => state.dashboard

export const selectSummaries = createSelector(
  [selectDashboardReducer],
  (dashboard) => dashboard.summaries
)

export const selectUserSummary = createSelector(
  [selectDashboardReducer],
  (dashboard) => dashboard.userSummary
)