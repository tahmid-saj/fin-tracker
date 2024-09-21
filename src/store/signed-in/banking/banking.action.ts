import { ActionWithPayload, createAction } from "../../../utils/reducer/reducer.utils";
import { BANKING_ACTION_TYPES, BANKING_SUB_ACTION_TYPES, BankingAccount, BankingSummary, Transaction } from "./banking.types";

import { validateBankingAccountCreation, validateDepositAmount, 
        validateWithdrawalAmount, validateBankingAccountTransfer } 
from "../../../utils/validations/banking.validation";

import { TRANSACTION_TYPES, DEFAULT_BANKING_ACCOUNTS, DEFAULT_BANKING_SUMMARY } from "../../../utils/constants/banking.constants";

export type CreateBankingAccountStart = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, BankingAccount[]>
export type CreateBankingAccountFailed = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, Error>
export type CreateBankingAccountSucess = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, BankingAccount[]>

export type DepositToBankingAccountStart = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, BankingAccount[]>
export type DepositToBankingAccountFailed = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, Error>
export type DepositToBankingAccountSuccess = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, BankingAccount[]>

export type WithdrawFromBankingAccountStart = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, BankingAccount[]>
export type WithdrawFromBankingAccountFailed = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, Error>
export type WithdrawFromBankingAccountSuccess = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, BankingAccount[]>

export type TransferToBankingAccountStart = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, BankingAccount[]>
export type TransferToBankingAccountFailed = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, Error>
export type TransferToBankingAccountSuccess = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, BankingAccount[]>

export type CloseBankingAccountStart = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, BankingAccount[]>
export type CloseBankingAccountFailed = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, Error>
export type CloseBankingAccountSuccess = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, BankingAccount[]>

export type SetBankingSummaryStart = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, BankingAccount[]>
export type SetBankingSummaryFailed = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, Error>
export type SetBankingSummarySuccess = ActionWithPayload<BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, BankingAccount[]>


// helper functions

const createBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string): BankingAccount[] => {
  if (validateBankingAccountCreation(bankingAccounts, bankingAccountName)) return bankingAccounts;

  // postBankingAccountCreate(userId, email, bankingAccountName);

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
  
  // const transactionInfo = {
    //   name: bankingAccountName,
    //   amount: depositAmount,
    //   type: TRANSACTION_TYPES.deposit,
    //   reason: depositReason
    // };
    // postBankingAccountTransaction(userId, email, transactionInfo);
    
  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    if (account.name === bankingAccountName) {
      
      return { 
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
      }
    }
    
    return account;
  });

  return updatedBankingAccounts;
};

const withdrawFromBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  withdrawAmount: number, withdrawReason: string): BankingAccount[] => {
  if (validateWithdrawalAmount(bankingAccounts, bankingAccountName, withdrawAmount)) return bankingAccounts;

  // const transactionInfo = {
  //   name: bankingAccountName,
  //   amount: withdrawAmount,
  //   type: TRANSACTION_TYPES.withdrawal,
  //   reason: withdrawReason,
  // };
  // postBankingAccountTransaction(userId, email, transactionInfo);
  
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


  // const transactionInfo = {
  //   name: bankingAccountTransferFromName,
  //   transferTo: bankingAccountTransferToName,
  //   amount: transferAmount,
  //   reason: transferReason,
  //   type: TRANSACTION_TYPES.transfer,
  // };
  // postBankingAccountTransaction(userId, email, transactionInfo);

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
            transferReason: transferReason,
          }
        ] 
      }
    }

    return account;
  });

  return updatedBankingAccounts;
};

const closeBankingAccountHelper = (bankingAccounts: BankingAccount[], bankingAccountName: string): BankingAccount[] => {
  // deleteBankingAccount(userId, email, bankingAccountName);
  
  // return bankingAccounts without the bankingAccountName
  return bankingAccounts.filter(account => account.name !== bankingAccountName);
};

// set default banking account values
const setDefaultBankingAccountsValuesHelper = () => {
  // await putBankingAccountsData(bankingAccounts);
  return DEFAULT_BANKING_ACCOUNTS;
};

// set default banking summary values
const setDefaultBankingSummaryValuesHelper = () => {
  // await putBankingSummaryData(bankingSummary);
  return DEFAULT_BANKING_SUMMARY;
};

// actions

export const createBankingAccount = (currentUser: any, bankingAccounts: BankingAccount[], bankingAccountName: string) => {
  const newBankingAccounts = createBankingAccountHelper(bankingAccounts, bankingAccountName);
  // TODO: async functions in helper functions above will be moved to sagas
  // setBankingAccounts(res);
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START,
    // TODO: payload values will be extracted in reducer and saga where appropriate
    { 
      bankingSubActionType: BANKING_SUB_ACTION_TYPES.CREATE,
      bankingAccounts: newBankingAccounts,
      userId: currentUser.uid,
      email: currentUser.email,
      bankingAccountName: bankingAccountName
    })
};

export const depositToBankingAccount = (currentUser: any, bankingAccounts: BankingAccount[], 
  bankingAccountName: string, depositAmount: number, depositReason: string) => {
  const newBankingAccounts = depositToBankingAccountHelper(bankingAccounts, bankingAccountName, depositAmount, depositReason);
  // setBankingAccounts(res);

  const transactionInfo = {
    name: bankingAccountName,
    amount: depositAmount,
    type: TRANSACTION_TYPES.deposit,
    reason: depositReason
  };

  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, 
    { 
      bankingSubActionType: BANKING_SUB_ACTION_TYPES.DEPOSIT,
      bankingAccounts: newBankingAccounts,
      userId: currentUser.uid,
      email: currentUser.email,
      transactionInfo: transactionInfo
    })
};

export const withdrawFromBankingAccount = (currentUser: any, bankingAccounts: BankingAccount[], 
  bankingAccountName: string, withdrawAmount: number, withdrawReason: string) => {
  const newBankingAccounts = withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason);
  // setBankingAccounts(res);

  const transactionInfo = {
    name: bankingAccountName,
    amount: withdrawAmount,
    type: TRANSACTION_TYPES.withdrawal,
    reason: withdrawReason,
  };

  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, 
    {  
      bankingSubActionType: BANKING_SUB_ACTION_TYPES.WITHDRAWAL,
      bankingAccounts: newBankingAccounts,
      userId: currentUser.uid,
      email: currentUser.email,
      transactionInfo: transactionInfo
    })
};

export const transferToBankingAccount = (currentUser: any, bankingAccounts: BankingAccount[], 
  bankingAccountTransferFromName: string, bankingAccountTransferToName: string, transferAmount: number, transferReason: string) => {
  const newBankingAccounts = transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
    bankingAccountTransferToName, transferAmount, transferReason);
  // setBankingAccounts(res);

  const transactionInfo = {
    name: bankingAccountTransferFromName,
    transferTo: bankingAccountTransferToName,
    amount: transferAmount,
    reason: transferReason,
    type: TRANSACTION_TYPES.transfer,
  };

  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, 
    { 
      bankingSubActionType: BANKING_SUB_ACTION_TYPES.TRANSFER,
      bankingAccounts: newBankingAccounts,
      userId: currentUser.uid,
      email: currentUser.email,
      transactionInfo: transactionInfo
    })
};

export const closeBankingAccount = (currentUser: any, bankingAccounts: BankingAccount[], bankingAccountName: string) => {
  const newBankingAccounts = closeBankingAccountHelper(bankingAccounts, bankingAccountName);
  // setBankingAccounts(res);

  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START,
    { 
      bankingSubActionType: BANKING_SUB_ACTION_TYPES.CLOSE,
      bankingAccounts: newBankingAccounts,
      userId: currentUser.uid,
      email: currentUser.email,
      bankingAccountName: bankingAccountName
    })
};

// set default banking accounts values
export const setDefaultBankingAccountsValues = () => {
  const newBankingAccounts = setDefaultBankingAccountsValuesHelper();
  return createAction(BANKING_ACTION_TYPES.SET_DEFAULT_BANKING_ACCOUNTS_VALUES, newBankingAccounts )
};

// set default banking summary values
export const setDefaultBankingSummaryValues = () => {
  const newBankingSummary = setDefaultBankingSummaryValuesHelper()
  return createAction(BANKING_ACTION_TYPES.SET_DEFAULT_BANKING_SUMMARY_VALUES, newBankingSummary)
};

// update banking accounts and summary on sign out
export const updateBankingAccountsAndSummary = (currentUser: any, bankingAccounts: BankingAccount[], bankingSummary: BankingSummary) => {
  // putBankingAccountsData(currentUser.uid, currentUser.email, bankingAccounts);
  // putBankingSummaryData(currentUser.uid, currentUser.email, bankingSummary);
  return createAction(BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_START,
    {
      userId: currentUser.uid,
      email: currentUser.email,
      bankingAccounts: bankingAccounts,
      bankingSummary: bankingSummary
    })
};

export const setBankingAccountsSuccess = (bankingAccounts: BankingAccount[]) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, bankingAccounts)
}

export const setBankingAccountsFailed = (error: Error) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, error)
}

export const updateBankingAccountsAndSummarySuccess = () => {
  return createAction(BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_SUCCESS)
}

export const updateBankingAccountsAndSummaryFailed = (error: Error) => {
  return createAction(BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_FAILED, error)
}

export const setBankingAccounts = (bankingAccounts: BankingAccount[]) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, bankingAccounts)
}

export const setBankingSummary = (bankingSummary: BankingSummary) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_SUMMARY, bankingSummary)
}