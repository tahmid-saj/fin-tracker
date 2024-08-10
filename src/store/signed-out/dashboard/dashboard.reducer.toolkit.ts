import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "./dashboard.reducer";

export const DASHBOARD_INITIAL_STATE: DashboardState = {
  summaries: {},
  userSummary: {}
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: DASHBOARD_INITIAL_STATE,
  reducers: {
    setSummaries(state, action) {
      state.summaries = action.payload
    },
    setUserSummary(state, action) {
      state.userSummary = action.payload
    }
  }
})

export const { setSummaries, setUserSummary } = dashboardSlice.actions

export const dashboardReducer = dashboardSlice.reducer