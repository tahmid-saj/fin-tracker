export enum BANKING_ACTION_TYPES {
  SET_BANKING_ACCOUNTS_START = "banking/SET_BANKING_ACCOUNTS_START",
  SET_BANKING_ACCOUNTS_SUCCESS = "banking/SET_BANKING_ACCOUNTS_SUCCESS",
  SET_BANKING_ACCOUNTS_FAILED = "banking/SET_BANKING_ACCOUNTS_FAILED",

  SET_BANKING_SUMMARY = "banking/SET_BANKING_SUMMARY",

  SET_DEFAULT_BANKING_ACCOUNTS_VALUES = "banking/SET_DEFAULT_BANKING_ACCOUNTS_VALUES",
  SET_DEFAULT_BANKING_SUMMARY_VALUES = "banking/SET_DEFAULT_BANKING_SUMMARY_VALUES",

  UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_START = "banking/UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_START",
  UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_SUCCESS = "banking/UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_SUCCESS",
  UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_FAILED = "banking/UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_FAILED",
}

export enum BANKING_SUB_ACTION_TYPES {
  CREATE = "banking/CREATE",
  DEPOSIT = "banking/DEPOSIT",
  WITHDRAWAL = "banking/WITHDRAWAL",
  TRANSFER = "banking/TRANSFER",
  CLOSE = "banking/CLOSE"
}

// banking types
export type BankingAccount = {
  name: string;
  currentBalance: number;
  totalIn: number;
  totalOut: number;
  transactions?: Transaction[];
}

export type Transaction = {
  amount: number;
  type: string;
  reason?: string;
  addToExpenses?: boolean
}

export type BankingSummary = {
  currentAllBankingBalance?: number;
  totalAllBankingIn?: number;
  totalAllBankingOut?: number;
}