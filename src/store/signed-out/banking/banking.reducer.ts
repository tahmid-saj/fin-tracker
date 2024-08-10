import { AnyAction } from "redux";
import { BANKING_ACTION_TYPES, BankingAccount, BankingSummary } from "./banking.types";

export type BankingState = {
  readonly bankingAccounts: BankingAccount[];
  readonly bankingSummary: BankingSummary;
}

export const BANKING_INITIAL_STATE: BankingState = {
  bankingAccounts: [],
  bankingSummary: {}
}

export const bankingReducer = (state=BANKING_INITIAL_STATE, action: AnyAction): BankingState => {
  

  // const { type, payload } = action

  // switch(type) {
  //   case BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS:
  //     return {
  //       ...state,
  //       bankingAccounts: payload
  //     }
  //   case BANKING_ACTION_TYPES.SET_BANKING_SUMMARY:
  //     return {
  //       ...state,
  //       bankingSummary: payload
  //     }
  //   default:
  //     return state
  // }
}