import { createAction } from "../../../utils/reducer/reducer.utils"
import { DASHBOARD_ACTION_TYPES } from "./dashboard.types"

// actions

export const setSummaries = (summaries) => {
  return createAction(DASHBOARD_ACTION_TYPES.SET_SUMMARIES, summaries)
}

export const setUserSummary = (userSummary) => {
  return createAction(DASHBOARD_ACTION_TYPES.SET_USER_SUMMARY, userSummary)
}