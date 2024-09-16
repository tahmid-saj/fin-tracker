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