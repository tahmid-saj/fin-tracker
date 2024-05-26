import { createAction } from "../../../utils/reducer/reducer.utils";
import { BANKING_ACTION_TYPES, BANKING_SUB_ACTION_TYPES } from "./banking.types";

import { validateBankingAccountCreation, validateDepositAmount, 
        validateWithdrawalAmount, validateBankingAccountTransfer } 
from "../../../utils/validations/banking.validation";

import { TRANSACTION_TYPES, DEFAULT_BANKING_ACCOUNTS, DEFAULT_BANKING_SUMMARY } from "../../../utils/constants/banking.constants";
// helper functions

const createBankingAccountHelper = (bankingAccounts, bankingAccountName) => {
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

const depositToBankingAccountHelper = (bankingAccounts, bankingAccountName, depositAmount, depositReason) => {
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
          ...account.transactions, 
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

const withdrawFromBankingAccountHelper = (bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason) => {
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

const transferToBankingAccountHelper = (bankingAccounts, bankingAccountTransferFromName, 
  bankingAccountTransferToName, transferAmount, transferReason) => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName
  if (validateBankingAccountTransfer(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount)) return bankingAccounts;

  // console.log(bankingAccountTransferToName, transferAmount);

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
            transferReason: transferReason,
          }
        ] 
      }
    }

    return account;
  });

  return updatedBankingAccounts;
};

const closeBankingAccountHelper = (bankingAccounts, bankingAccountName) => {
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

export const createBankingAccount = (currentUser, bankingAccounts, bankingAccountName) => {
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

export const depositToBankingAccount = (currentUser, bankingAccounts, bankingAccountName, depositAmount, depositReason) => {
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

export const withdrawFromBankingAccount = (currentUser, bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason) => {
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

export const transferToBankingAccount = (currentUser, bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount, transferReason) => {
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

export const closeBankingAccount = (currentUser, bankingAccounts, bankingAccountName) => {
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
export const updateBankingAccountsAndSummary = (currentUser, bankingAccounts, bankingSummary) => {
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

export const setBankingAccountsSuccess = (bankingAccounts) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, bankingAccounts)
}

export const setBankingAccountsFailed = (error) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_FAILED, error)
}

export const updateBankingAccountsAndSummarySuccess = () => {
  return createAction(BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_SUCCESS)
}

export const updateBankingAccountsAndSummaryFailed = (error) => {
  return createAction(BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_FAILED, error)
}

export const setBankingAccounts = (bankingAccounts) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_SUCCESS, bankingAccounts)
}

export const setBankingSummary = (bankingSummary) => {
  return createAction(BANKING_ACTION_TYPES.SET_BANKING_SUMMARY, bankingSummary)
}