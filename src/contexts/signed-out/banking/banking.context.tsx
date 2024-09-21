import React, { createContext, useState, useEffect, Component, ReactNode, FC } from "react";

import { validateBankingAccountCreation, validateDepositAmount, 
        validateWithdrawalAmount, validateBankingAccountTransfer } 
from "../../../utils/validations/banking.validation";

import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";

import { TRANSACTION_TYPES } from "../../../utils/constants/banking.constants";
import { BankingContextType, BankingProviderProps, BankingAccount, Transaction, BankingSummary } from "./banking.types";

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

  // 

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
  //       },
  //       {
  //         amount: -10,
  //         type: "WITHDRAW",
  //         reason: "gas",
  //         addedToExpenses: true
  //       },
  //     ],
  //   }
  // ]

  createBankingAccount: () => {},
  depositToBankingAccount: () => {},
  withdrawFromBankingAccount: () => {},
  transferToBankingAccount: () => {},
  closeBankingAccount: () => {},

  bankingSummary: {} as BankingSummary
  // bankingSummary structure:
  // {
  //   currentAllBankingBalance: 105,
  //   totalAllBankingIn: 120,
  //   totalAllBankingOut: -15,
  // }
});

// context component
export const BankingProvider: FC<BankingProviderProps> = ({ children }) => {
  const [bankingAccounts, setBankingAccounts] = useState<BankingAccount[] | []>([]);
  const [bankingSummary, setBankingSummary] = useState<BankingSummary | {}>({});

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts);

    

    setBankingSummary({ 
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut });
  }, [bankingAccounts]);

  const createBankingAccount = (bankingAccountName: string) => {
    setBankingAccounts(createBankingAccountHelper(bankingAccounts, bankingAccountName));
  };

  const depositToBankingAccount = (bankingAccountName: string, depositAmount: number, depositReason: string) => {
    setBankingAccounts(depositToBankingAccountHelper(bankingAccounts, bankingAccountName, depositAmount, depositReason));
  };

  const withdrawFromBankingAccount = (bankingAccountName: string, withdrawAmount: number, withdrawReason: string, addToExpenses: boolean) => {
    setBankingAccounts(withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason, addToExpenses));
  };

  const transferToBankingAccount = (bankingAccountTransferFromName: string, bankingAccountTransferToName: string, 
    transferAmount: number, transferReason: string) => {
    setBankingAccounts(transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
                                                      bankingAccountTransferToName, transferAmount, transferReason));
  };

  const closeBankingAccount = (bankingAccountName: string) => {
    setBankingAccounts(closeBankingAccountHelper(bankingAccounts, bankingAccountName));
  };

  const value = { bankingAccounts, createBankingAccount, depositToBankingAccount, 
    withdrawFromBankingAccount, transferToBankingAccount, closeBankingAccount, bankingSummary };

  return (
    <BankingContext.Provider value={ value }>{ children }</BankingContext.Provider>
  )
}