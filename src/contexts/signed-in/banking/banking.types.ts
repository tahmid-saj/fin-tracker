import { ReactNode } from "react";

// banking types
export interface BankingContextType {
  bankingAccounts: BankingAccount[];

  createBankingAccount: (bankingAccountName: string) => void;
  depositToBankingAccount: (bankingAccountName: string, depositAmount: number, depositReason: string) => void;
  withdrawFromBankingAccount: (bankingAccountName: string, withdrawAmount: number, withdrawReason: string, addToExpenses: boolean) => void;
  transferToBankingAccount: (bankingAccountTransferFromName: string, bankingAccountTransferToName: string, transferAmount: number, transferReason: string) => void;
  closeBankingAccount: (bankingAccountName: string) => void;

  bankingSummary: BankingSummary;

  setDefaultBankingAccountsValues: () => void;
  setDefaultBankingSummaryValues: () => void;
  updateBankingAccountsAndSummary: () => void;
}

export interface BankingProviderProps {
  children: ReactNode
}

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

export type TransactionInfo = {
  bankingAccountName?: string;
  name?: string;
  amount: number;
  type: string;
  reason?: string;
  transferTo?: string;
  addToExpenses?: boolean;
}