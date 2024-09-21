import { AnyAction } from "redux";
import { BANKING_ACTION_TYPES, BankingAccount, BankingSummary } from "./banking.types";
import { closeBankingAccount, createBankingAccount, depositToBankingAccount, setBankingSummary, 
  transferToBankingAccount, withdrawFromBankingAccount 
} from "./banking.action";

export type BankingState = {
  readonly bankingAccounts: BankingAccount[] | null | undefined;
  readonly bankingSummary: BankingSummary | null | undefined;
}

export const BANKING_INITIAL_STATE: BankingState = {
  bankingAccounts: [],
  bankingSummary: {}
}

export const bankingReducer = (state=BANKING_INITIAL_STATE, action: AnyAction): BankingState => {
  if (createBankingAccount.match(action) || depositToBankingAccount.match(action) ||
    withdrawFromBankingAccount.match(action) || transferToBankingAccount.match(action) || closeBankingAccount.match(action)) {
    return {
      ...state,
      bankingAccounts: action.payload
    }
  }

  if (setBankingSummary.match(action)) {
    return {
      ...state,
      bankingSummary: action.payload
    }
  }

  return state

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