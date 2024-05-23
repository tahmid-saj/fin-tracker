import { SAVINGS_ACTION_TYPES } from "./savings.types";

export const SAVINGS_INITIAL_STATE = {
  savingsAccounts: [],
  savingsAccountsSummary: {}
}

export const savingsReducer = (state=SAVINGS_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS:
      return {
        ...state,
        savingsAccounts: payload
      }
    case SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS_SUMMARY:
      return {
        ...state,
        savingsAccountsSummary: payload
      }
    default:
      return state
  }
}