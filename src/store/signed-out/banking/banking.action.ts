import { ActionWithPayload, createAction, withMatcher } from "../../../utils/reducer/reducer.utils";
import { BANKING_ACTION_TYPES } from "./banking.types";

import { validateBankingAccountCreation,
  validateDepositAmount, validateWithdrawalAmount, validateBankingAccountTransfer
} from "../../../utils/validations/banking.validation";
import { TRANSACTION_TYPES } from "../../../utils/constants/banking.constants";
import { Action } from "redux";
import { BankingAccount, Transaction, BankingSummary } from "./banking.types";

export type CreateBankingAccount = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, BankingAccount[]>
export type DepositToBankingAccount = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, BankingAccount[]>
export type WithdrawFromBankingAccount = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, BankingAccount[]>
export type TransferToBankingAccount = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, BankingAccount[]>
export type CloseBankingAccount = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, BankingAccount[]>
export type SetBankingSummary = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_SUMMARY, BankingSummary>

// helper functions

const createBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string): BankingAccount[] => {
  if (validateBankingAccountCreation(bankingAccounts, bankingAccountName)) return bankingAccounts;

  // add bankingAccount to bankingAccounts
  return [ ...bankingAccounts, 
  { 
    name: bankingAccountName,
    currentBalance: 0,
    totalIn: 0,
    totalOut: 0,
    transactions: [], 
  }]
};

const depositToBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  depositAmount: number, depositReason: string): BankingAccount[] => {
  if (validateDepositAmount(bankingAccounts, bankingAccountName, depositAmount)) return bankingAccounts;

  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ? 
      { 
        ...account, 
        currentBalance: account.currentBalance + Number(depositAmount), 
        totalIn: account.totalIn + Number(depositAmount),
        transactions: [ 
          ...account.transactions as Transaction[], 
          {
            amount: Number(depositAmount),
            type: TRANSACTION_TYPES.deposit, 
            reason: depositReason,
          }
        ] 
      } : account;
  });

  return updatedBankingAccounts;
};

const withdrawFromBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  withdrawAmount: number, withdrawReason: string, addToExpenses: boolean): BankingAccount[] => {
  if (validateWithdrawalAmount(bankingAccounts, bankingAccountName, withdrawAmount)) return bankingAccounts;

  // update currentBalance, totalOut and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ?
      {
        ...account,
        currentBalance: account.currentBalance - Number(withdrawAmount),
        totalOut: account.totalOut + Number(withdrawAmount),
        transactions: [ 
          ...account.transactions as Transaction[],
          {
            amount: Number(withdrawAmount), 
            type: TRANSACTION_TYPES.withdrawal,
            reason: withdrawReason,
            addToExpenses: addToExpenses
          } 
        ]
      } : account;
  });

  return updatedBankingAccounts;
};

const transferToBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountTransferFromName: string, 
  bankingAccountTransferToName: string, transferAmount: number, transferReason: string): BankingAccount[] => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName
  if (validateBankingAccountTransfer(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount)) return bankingAccounts;

  // update bankingAccountTransferFromName and bankingAccountTransferToName in bankingAccounts
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    if (account.name === String(bankingAccountTransferFromName)) {
      return {
        ...account,
        currentBalance: account.currentBalance - Number(transferAmount),
        totalOut: account.totalOut + Number(transferAmount),
        transactions: [
          ...account.transactions as Transaction[],
          {
            amount: Number(transferAmount),
            type: TRANSACTION_TYPES.withdrawalTransfer,
            transferReason: transferReason,
          }
        ]
      }
    }
    
    if (account.name === String(bankingAccountTransferToName)) {
      return {
        ...account,
        currentBalance: account.currentBalance + Number(transferAmount),
        totalIn: account.totalIn + Number(transferAmount),
        transactions: [
          ...account.transactions as Transaction[],
          {
            amount: Number(transferAmount),
            type: TRANSACTION_TYPES.depositTransfer,
          }
        ] 
      }
    }

    return account;
  });

  return updatedBankingAccounts;
};

const closeBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string): BankingAccount[] => {
  // return bankingAccounts without the bankingAccountName
  return bankingAccounts.filter(account => account.name !== bankingAccountName);
};

// actions

export const createBankingAccount = withMatcher((bankingAccounts: BankingAccount[], bankingAccountName: string): CreateBankingAccount => {
  const newBankingAccounts = createBankingAccountHelper(bankingAccounts, bankingAccountName)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
})

export const depositToBankingAccount = withMatcher((bankingAccounts: BankingAccount[], bankingAccountName: string, 
  depositAmount: number, depositReason: string): DepositToBankingAccount => {
  const newBankingAccounts = depositToBankingAccountHelper(bankingAccounts, bankingAccountName, depositAmount, depositReason)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
})

export const withdrawFromBankingAccount = withMatcher((bankingAccounts: BankingAccount[], bankingAccountName: string, 
  withdrawAmount: number, withdrawReason: string, addToExpenses: boolean): WithdrawFromBankingAccount => {
  const newBankingAccounts = withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason, addToExpenses)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
})

export const transferToBankingAccount = withMatcher((bankingAccounts: BankingAccount[], bankingAccountTransferFromName: string, 
  bankingAccountTransferToName: string, transferAmount: number, transferReason: string): TransferToBankingAccount => {
  const newBankingAccounts = transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
                                                    bankingAccountTransferToName, transferAmount, transferReason)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
})

export const closeBankingAccount = withMatcher((bankingAccounts: BankingAccount[], bankingAccountName: string): CloseBankingAccount => {
  const newBankingAccounts = closeBankingAccountHelper(bankingAccounts, bankingAccountName)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
})

export const setBankingSummary = withMatcher((bankingSummary: BankingSummary): SetBankingSummary => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_SUMMARY, bankingSummary)
})