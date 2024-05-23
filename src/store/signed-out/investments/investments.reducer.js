import { INVESTMENTS_ACTION_TYPES } from "./investments.types";

export const INVESTMENTS_INITIAL_STATE = {
  investments: [],
  investmentsSummary: {}
}

export const investmentsReducer = (state=INVESTMENTS_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS:
      return {
        ...state,
        investments: payload
      }
    case INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS_SUMMARY:
      return {
        ...state,
        investmentsSummary: payload
      }
    default:
      return state
  }
}