import React, { createContext, useState, useEffect, FC } from "react";

import { validateBankingAccountCreation, validateDepositAmount, 
        validateWithdrawalAmount, validateBankingAccountTransfer } 
from "../../../utils/validations/banking.validation";

import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";

import { TRANSACTION_TYPES, DEFAULT_BANKING_ACCOUNTS, DEFAULT_BANKING_SUMMARY } from "../../../utils/constants/banking.constants";

import { getBankingAccountsData, getBankingSummaryData,
        postBankingAccountCreate, postBankingAccountTransaction, deleteBankingAccount,
        putBankingAccountsData, putBankingSummaryData } from "../../../utils/api-requests/banking.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";
import { BankingAccount, BankingContextType, BankingProviderProps, BankingSummary, Transaction, TransactionInfo } from "./banking.types";

// helper functions

const createBankingAccountHelper = async (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  userId: string | null | undefined, email: string | null | undefined): Promise<BankingAccount[]> => {
  if (validateBankingAccountCreation(bankingAccounts, bankingAccountName)) return bankingAccounts;
   
  postBankingAccountCreate(userId, email, bankingAccountName);
  
  

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

const depositToBankingAccountHelper = async (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  depositAmount: number, depositReason: string, userId: string | null | undefined, email: string | null | undefined): Promise<BankingAccount[]> => {
  if (validateDepositAmount(bankingAccounts, bankingAccountName, depositAmount)) return bankingAccounts;
  
  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const transactionInfo: TransactionInfo = {
    name: bankingAccountName,
    amount: depositAmount,
    type: TRANSACTION_TYPES.deposit,
    reason: depositReason
  };
  postBankingAccountTransaction(userId, email, transactionInfo);
  
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

const withdrawFromBankingAccountHelper = async (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  withdrawAmount: number, withdrawReason: string, addToExpenses: boolean, userId: string | null | undefined, email: string | null | undefined): Promise<BankingAccount[]> => {
  if (validateWithdrawalAmount(bankingAccounts, bankingAccountName, withdrawAmount)) return bankingAccounts;

  // update currentBalance, totalOut and transactions in bankingAccounts for bankingAccountName
  const transactionInfo = {
    name: bankingAccountName,
    amount: withdrawAmount,
    type: TRANSACTION_TYPES.withdrawal,
    reason: withdrawReason,
    addToExpenses: addToExpenses
  };
  postBankingAccountTransaction(userId, email, transactionInfo);

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

const transferToBankingAccountHelper = async (bankingAccounts: BankingAccount[], bankingAccountTransferFromName: string, bankingAccountTransferToName: string, 
  transferAmount: number, transferReason: string, userId: string | null | undefined, email: string | null | undefined): Promise<BankingAccount[]> => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName
  if (validateBankingAccountTransfer(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount)) return bankingAccounts;

  const transactionInfo = {
    name: bankingAccountTransferFromName,
    transferTo: bankingAccountTransferToName,
    amount: transferAmount,
    reason: transferReason,
    type: TRANSACTION_TYPES.transfer,
  };
  postBankingAccountTransaction(userId, email, transactionInfo);

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

const closeBankingAccountHelper = async (bankingAccounts: BankingAccount[], bankingAccountName: string, 
  userId: string | null | undefined, email: string | null | undefined): Promise<BankingAccount[]> => {
  deleteBankingAccount(userId, email, bankingAccountName);
  
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

// initial state
export const BankingContext = createContext<BankingContextType>({
  bankingAccounts: [],
  // bankingAccounts structure:
  // [
  //   {
  //     name: "TD",
  //     currentBalance: 120,
  //     totalIn: 135,
  //     totalOut: -15,
  //     transactions: [
  //       {
  //         amount: 135,
  //         type: "DEPOSIT"
  //       },
  //       {
  //         amount: -15,
  //         type: "WITHDRAW",
  //         reason: "gas",
  //         addToExpenses: true
  //       }
  //     ],
  //   }
  // ]

  createBankingAccount: () => {},
  depositToBankingAccount: () => {},
  withdrawFromBankingAccount: () => {},
  transferToBankingAccount: () => {},
  closeBankingAccount: () => {},

  bankingSummary: {},
  // bankingSummary structure:
  // {
  //   currentAllBankingBalance: 105,
  //   totalAllBankingIn: 120,
  //   totalAllBankingOut: -15,
  // }

  // signing out
  setDefaultBankingAccountsValues: () => {},
  setDefaultBankingSummaryValues: () => {},
  updateBankingAccountsAndSummary: () => {},
});

// context component
export const BankingProvider: FC<BankingProviderProps> = ({ children }) => {
  const [bankingAccounts, setBankingAccounts] = useState<BankingAccount[] | []>([]);
  const [bankingSummary, setBankingSummary] = useState<BankingSummary | {}>({});

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts);

    setBankingSummary({ 
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut });
  }, [bankingAccounts]);

  useEffect(() => {
    async function fetchBankingData() {
      if (currentUser) {
        const bankingAccountsData = await getBankingAccountsData(currentUser.uid, currentUser.email);
        const bankingSummartData = await getBankingSummaryData(currentUser.uid, currentUser.email);
        
        if (bankingAccountsData) {
          const { bankingAccounts } = await bankingAccountsData;
          setBankingAccounts(bankingAccounts);
        }
        if (bankingSummartData) {
          const { bankingSummary } = await bankingSummartData;
          setBankingSummary(bankingSummary);
        }

      } else if (!currentUser) {
        setDefaultBankingAccountsValues();
        setDefaultBankingSummaryValues();
      }
    }
    fetchBankingData();
  }, [currentUser]);

  const createBankingAccount = async (bankingAccountName: string) => {
    if (currentUser) {
      const res = await createBankingAccountHelper(bankingAccounts, bankingAccountName, currentUser.uid, currentUser.email);
  
      setBankingAccounts(res);
    }
  };

  const depositToBankingAccount = async (bankingAccountName: string, depositAmount: number, depositReason: string) => {
    if (currentUser) {
      const res = await depositToBankingAccountHelper(bankingAccounts, bankingAccountName, 
        depositAmount, depositReason, currentUser.uid, currentUser.email);
  
      setBankingAccounts(res);
    }
  };

  const withdrawFromBankingAccount = async (bankingAccountName: string, withdrawAmount: number, withdrawReason: string, addToExpenses: boolean) => {
    if (currentUser) {
      const res = await withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, 
        withdrawAmount, withdrawReason, addToExpenses, currentUser.uid, currentUser.email);
      
      setBankingAccounts(res);
    }
  };

  const transferToBankingAccount = async (bankingAccountTransferFromName: string, bankingAccountTransferToName: string, 
    transferAmount: number, transferReason: string) => {
    if (currentUser) {
      const res = await transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
        bankingAccountTransferToName, transferAmount, transferReason, currentUser.uid, currentUser.email);
  
      setBankingAccounts(res);
    }
  };

  const closeBankingAccount = async (bankingAccountName: string) => {
    if (currentUser) {
      const res = await closeBankingAccountHelper(bankingAccounts, bankingAccountName, currentUser.uid, currentUser.email);
  
      setBankingAccounts(res);
    }
  };

  // set default banking accounts values
  const setDefaultBankingAccountsValues = () => {
    setBankingAccounts(setDefaultBankingAccountsValuesHelper());
  };

  // set default banking summary values
  const setDefaultBankingSummaryValues = () => {
    setBankingSummary(setDefaultBankingSummaryValuesHelper());
  };

  // update banking accounts and summary on sign out
  const updateBankingAccountsAndSummary = async () => {
    if (currentUser) {
      putBankingAccountsData(currentUser.uid, currentUser.email, bankingAccounts);
      putBankingSummaryData(currentUser.uid, currentUser.email, bankingSummary);
    }
  };

  const value = { bankingAccounts, createBankingAccount, depositToBankingAccount, 
    withdrawFromBankingAccount, transferToBankingAccount, closeBankingAccount, bankingSummary,
    setDefaultBankingAccountsValues, setDefaultBankingSummaryValues, updateBankingAccountsAndSummary };

  return (
    <BankingContext.Provider
      value={ value }>
      { children }
    </BankingContext.Provider>
  );
};