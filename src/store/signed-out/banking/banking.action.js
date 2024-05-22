import { createAction } from "../../../utils/reducer/reducer.utils";
import { BANKING_ACTION_TYPES } from "./banking.types";

import { validateBankingAccountCreation,
  validateDepositAmount, validateWithdrawalAmount, validateBankingAccountTransfer
} from "../../../utils/validations/banking.validation";
import { TRANSACTION_TYPES } from "../../../utils/constants/banking.constants";

// helper functions

const createBankingAccountHelper = (bankingAccounts, bankingAccountName) => {
  if (validateBankingAccountCreation(bankingAccounts, bankingAccountName)) return bankingAccounts;

  console.log(`Creating ${bankingAccountName}`);

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

const depositToBankingAccountHelper = (bankingAccounts, bankingAccountName, depositAmount, depositReason) => {
  if (validateDepositAmount(bankingAccounts, bankingAccountName, depositAmount)) return bankingAccounts;

  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ? 
      { 
        ...account, 
        currentBalance: account.currentBalance + Number(depositAmount), 
        totalIn: account.totalIn + Number(depositAmount),
        transactions: [ 
          ...account.transactions, 
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

const withdrawFromBankingAccountHelper = (bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason) => {
  if (validateWithdrawalAmount(bankingAccounts, bankingAccountName, withdrawAmount)) return bankingAccounts;

  // update currentBalance, totalOut and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ?
      {
        ...account,
        currentBalance: account.currentBalance - Number(withdrawAmount),
        totalOut: account.totalOut + Number(withdrawAmount),
        transactions: [ 
          ...account.transactions,
          {
            amount: Number(withdrawAmount), 
            type: TRANSACTION_TYPES.withdrawal,
            reason: withdrawReason,
          } 
        ]
      } : account;
  });

  return updatedBankingAccounts;
};

const transferToBankingAccountHelper = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount, transferReason) => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName
  if (validateBankingAccountTransfer(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount)) return bankingAccounts;

  // console.log(bankingAccountTransferToName, transferAmount);

  // update bankingAccountTransferFromName and bankingAccountTransferToName in bankingAccounts
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    if (account.name === String(bankingAccountTransferFromName)) {
      return {
        ...account,
        currentBalance: account.currentBalance - Number(transferAmount),
        totalOut: account.totalOut + Number(transferAmount),
        transactions: [
          ...account.transactions,
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
          ...account.transactions,
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

const closeBankingAccountHelper = (bankingAccounts, bankingAccountName) => {
  // return bankingAccounts without the bankingAccountName
  return bankingAccounts.filter(account => account.name !== bankingAccountName);
};

// actions

export const createBankingAccount = (bankingAccounts, bankingAccountName) => {
  const newBankingAccounts = createBankingAccountHelper(bankingAccounts, bankingAccountName)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
};

export const depositToBankingAccount = (bankingAccounts, bankingAccountName, depositAmount, depositReason) => {
  const newBankingAccounts = depositToBankingAccountHelper(bankingAccounts, bankingAccountName, depositAmount, depositReason)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
};

export const withdrawFromBankingAccount = (bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason) => {
  const newBankingAccounts = withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
};

export const transferToBankingAccount = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount, transferReason) => {
  const newBankingAccounts = transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
                                                    bankingAccountTransferToName, transferAmount, transferReason)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
};

export const closeBankingAccount = (bankingAccounts, bankingAccountName) => {
  const newBankingAccounts = closeBankingAccountHelper(bankingAccounts, bankingAccountName)
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS, newBankingAccounts)
};

export const setBankingSummary = (bankingSummary) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_SUMMARY, bankingSummary)
}