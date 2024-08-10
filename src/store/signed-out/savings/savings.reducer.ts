import { AnyAction } from "redux";
import { SAVINGS_ACTION_TYPES, SavingsAccount, SavingsAccountsSummary } from "./savings.types";
import { closeSavingsAccount, createSavingsAccount, setSavingsAccountsSummary, updateSavingsAccount } from "./savings.action";

export type SavingsState = {
  readonly savingsAccounts: SavingsAccount[] | null | undefined;
  readonly savingsAccountsSummary: SavingsAccountsSummary | null | undefined;
}

export const SAVINGS_INITIAL_STATE: SavingsState = {
  savingsAccounts: [],
  savingsAccountsSummary: {}
}

export const savingsReducer = (state=SAVINGS_INITIAL_STATE, action: AnyAction): SavingsState => {
  if (createSavingsAccount.match(action) || updateSavingsAccount.match(action) || closeSavingsAccount.match(action)) {
    return {
      ...state,
      savingsAccounts: action.payload
    }
  }

  if (setSavingsAccountsSummary.match(action)) {
    return {
      ...state,
      savingsAccountsSummary: action.payload
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS:
  //     return {
  //       ...state,
  //       savingsAccounts: payload
  //     }
  //   case SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS_SUMMARY:
  //     return {
  //       ...state,
  //       savingsAccountsSummary: payload
  //     }
  //   default:
  //     return state
  // }
}