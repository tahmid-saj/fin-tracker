export enum BANKING_ACTION_TYPES {
  SET_BANKING_ACCOUNTS = "banking/SET_BANKING_ACCOUNTS",
  SET_BANKING_SUMMARY = "banking/SET_BANKING_SUMMARY",
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
  addToExpenses?: boolean;
}

export type BankingSummary = {
  currentAllBankingBalance?: number;
  totalAllBankingIn?: number;
  totalAllBankingOut?: number;
}