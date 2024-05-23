import { DASHBOARD_ACTION_TYPES } from "./dashboard.types";

export const DASHBOARD_INITIAL_STATE = {
  summaries: {},
  userSummary: {}
}

export const dashboardReducer = (state=DASHBOARD_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case DASHBOARD_ACTION_TYPES.SET_SUMMARIES:
      return {
        ...state,
        summaries: payload
      }
    case DASHBOARD_ACTION_TYPES.SET_USER_SUMMARY:
      return {
        ...state,
        userSummary: payload
      }
    default:
      return state
  }
}