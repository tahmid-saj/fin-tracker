import { AnyAction } from "redux";
import { BANKING_ACTION_TYPES, BankingAccount, BankingSummary } from "./banking.types";

export type BankingState = {
  readonly bankingAccounts: BankingAccount[] | null | undefined;
  readonly bankingSummary: BankingSummary | null | undefined;
  readonly isLoading: boolean;
  readonly error: any;
}

export const BANKING_INITIAL_STATE: BankingState = {
  bankingAccounts: [],
  bankingSummary: {},
  isLoading: false,
  error: null
}

export const bankingReducerSignedIn = (state=BANKING_INITIAL_STATE, action: AnyAction): BankingState => {
  const { type, payload } = action

  switch(type) {
  case BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START:
  case BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_START:
    return {
      ...state,
      isLoading: true
    }
  case BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS:
    return {
      ...state,
      bankingAccounts: payload,
      isLoading: false
    }
  case BANKING_ACTION_TYPES.SET_BANKING_SUMMARY:
    return {
      ...state,
      bankingSummary: payload,
      isLoading: false
    }
  case BANKING_ACTION_TYPES.SET_DEFAULT_BANKING_ACCOUNTS_VALUES:
    return {
      ...state,
      bankingAccounts: payload,
      isLoading: false
    }
  case BANKING_ACTION_TYPES.SET_DEFAULT_BANKING_SUMMARY_VALUES:
    return {
      ...state,
      bankingSummary: payload,
      isLoading: false
    }
  case BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_SUCCESS:
    return {
      ...state,
      isLoading: false
    }
  case BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED:
  case BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_FAILED:
    return {
      ...state,
      error: payload,
      isLoading: false
    }
  default:
    return state
  }
}