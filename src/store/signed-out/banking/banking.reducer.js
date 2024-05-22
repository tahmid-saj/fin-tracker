import { BANKING_ACTION_TYPES } from "./banking.types";

export const BANKING_INITIAL_STATE = {
  bankingAccounts: [],
  bankingSummary: {}
}

export const bankingReducer = (state=BANKING_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS:
      return {
        ...state,
        bankingAccounts: payload
      }
    case BANKING_ACTION_TYPES.SET_BANKING_SUMMARY:
      return {
        ...state,
        bankingSummary: payload
      }
    default:
      return state
  }
}