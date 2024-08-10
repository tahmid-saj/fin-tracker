import { AnyAction } from "redux";
import { DASHBOARD_ACTION_TYPES, Summaries, UserSummary } from "./dashboard.types";
import { setSummaries, setUserSummary } from "./dashboard.action";

export type DashboardState = {
  readonly summaries: Summaries | null | undefined;
  readonly userSummary: UserSummary | null | undefined;
}

export const DASHBOARD_INITIAL_STATE: DashboardState = {
  summaries: {},
  userSummary: {}
}

export const dashboardReducer = (state=DASHBOARD_INITIAL_STATE, action: AnyAction): DashboardState => {
  if (setSummaries.match(action)) {
    return {
      ...state,
      summaries: action.payload
    }
  }

  if (setUserSummary.match(action)) {
    return {
      ...state,
      userSummary: action.payload
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case DASHBOARD_ACTION_TYPES.SET_SUMMARIES:
  //     return {
  //       ...state,
  //       summaries: payload
  //     }
  //   case DASHBOARD_ACTION_TYPES.SET_USER_SUMMARY:
  //     return {
  //       ...state,
  //       userSummary: payload
  //     }
  //   default:
  //     return state
  // }
}