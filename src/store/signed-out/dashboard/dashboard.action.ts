import { ActionWithPayload, createAction, withMatcher } from "../../../utils/reducer/reducer.utils"
import { DASHBOARD_ACTION_TYPES, Summaries, UserSummary } from "./dashboard.types"

export type SetSummaries = ActionWithPayload<DASHBOARD_ACTION_TYPES.SET_SUMMARIES, Summaries>
export type SetUserSummary = ActionWithPayload<DASHBOARD_ACTION_TYPES.SET_USER_SUMMARY, UserSummary>

// actions

export const setSummaries = withMatcher((summaries: Summaries): SetSummaries => {
  return createAction(DASHBOARD_ACTION_TYPES.SET_SUMMARIES, summaries)
})

export const setUserSummary = withMatcher((userSummary: UserSummary): SetUserSummary => {
  return createAction(DASHBOARD_ACTION_TYPES.SET_USER_SUMMARY, userSummary)
})