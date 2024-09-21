// banking constants

export const PERMANENTLY_DELETE = "permanently delete";

export enum TRANSACTION_TYPE_CLASSES {
  DEPOSIT = "deposit-transaction",
  WITHDRAWAL = "withdraw-transaction",
  WITHDRAWAL_TRANSFER = "withdraw-transfer-transaction",
  DEPOSIT_TRANSFER = "deposit-transfer-transaction",
};

export enum TRANSACTION_TYPES {
  deposit = "DEPOSIT",
  withdrawal = "WITHDRAWAL",
  withdrawalTransfer = "WITHDRAWAL_TRANSFER",
  depositTransfer = "DEPOSIT_TRANSFER",
  transfer = "TRANSFER",
};

export const DEFAULT_BANKING_ACCOUNTS = [];

export const DEFAULT_BANKING_SUMMARY = {};