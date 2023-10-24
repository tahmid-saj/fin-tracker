import { createContext, useState, useEffect, useContext } from "react";

import { validateBankingAccountCreation, validateDepositAmount, 
        validateWithdrawalAmount, validateBankingAccountTransfer } 
from "../../../utils/validations/banking.validation";

import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";

import { TRANSACTION_TYPES, DEFAULT_BANKING_ACCOUNTS, DEFAULT_BANKING_SUMMARY } from "../../../utils/constants/banking.constants";

import { UserContext } from "../../shared/user/user.context";

import { getBankingAccountsData, getBankingSummaryData,
        postBankingAccountCreate, postBankingAccountTransaction, deleteBankingAccount,
        putBankingAccountsData, putBankingSummaryData } from "../../../utils/api-requests/banking.requests";

// helper functions

const createBankingAccountHelper = async (bankingAccounts, bankingAccountName, userId, email) => {
  if (validateBankingAccountCreation(bankingAccounts, bankingAccountName)) return bankingAccounts;

  console.log(`Creating ${bankingAccountName}`);

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

const depositToBankingAccountHelper = async (bankingAccounts, bankingAccountName, depositAmount, depositReason, userId, email) => {
  if (validateDepositAmount(bankingAccounts, bankingAccountName, depositAmount)) return bankingAccounts;
  
  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const transactionInfo = {
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

const withdrawFromBankingAccountHelper = (bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason, userId, email) => {
  if (validateWithdrawalAmount(bankingAccounts, bankingAccountName, withdrawAmount)) return bankingAccounts;

  // update currentBalance, totalOut and transactions in bankingAccounts for bankingAccountName
  const transactionInfo = {
    name: bankingAccountName,
    amount: withdrawAmount,
    type: TRANSACTION_TYPES.withdrawal,
    reason: withdrawReason,
  };
  postBankingAccountTransaction(userId, email, transactionInfo);

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
  bankingAccountTransferToName, transferAmount, transferReason, userId, email) => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName
  if (validateBankingAccountTransfer(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount)) return bankingAccounts;

  // console.log(bankingAccountTransferToName, transferAmount);

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

const closeBankingAccountHelper = (bankingAccounts, bankingAccountName, userId, email) => {
  // return bankingAccounts without the bankingAccountName
  deleteBankingAccount(bankingAccountName, userId, email);

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
export const BankingContext = createContext({
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
  setDefaultBankingAccountValues: () => {},
  setDefaultBankingSummaryValues: () => {},
});

// context component
export const BankingProvider = ({ children }) => {
  const [bankingAccounts, setBankingAccounts] = useState([]);
  const [bankingSummary, setBankingSummary] = useState({});

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts);

    console.log(bankingAccounts);

    setBankingSummary({ 
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut });
  }, [bankingAccounts]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const { bankingAccounts } = await getBankingAccountsData(currentUser.uid, currentUser.email);
        const { bankingSummary } = await getBankingSummaryData(currentUser.uid, currentUser.email);

        setBankingAccounts(bankingAccounts);
        setBankingSummary(bankingSummary);
        console.log(currentUser.uid, currentUser.email);
      } else if (!currentUser) {
        setDefaultBankingAccountsValues();
        setDefaultBankingSummaryValues();
      }
    }
    // TODO: uncomment when working on getting and updating data from sign in / sign out
    fetchData();
  }, [currentUser]);

  const createBankingAccount = async (bankingAccountName) => {
    const res = await createBankingAccountHelper(bankingAccounts, bankingAccountName, currentUser.uid, currentUser.email);

    setBankingAccounts(res);
  };

  const depositToBankingAccount = async (bankingAccountName, depositAmount, depositReason) => {
    const res = await depositToBankingAccountHelper(bankingAccounts, bankingAccountName, 
      depositAmount, depositReason, currentUser.uid, currentUser.email);

    setBankingAccounts(res);
  };

  const withdrawFromBankingAccount = async (bankingAccountName, withdrawAmount, withdrawReason) => {
    const res = await withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, 
      withdrawAmount, withdrawReason, currentUser.uid, currentUser.email);
    
    setBankingAccounts(res);
  };

  const transferToBankingAccount = async (bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount, transferReason) => {
    const res = await transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
      bankingAccountTransferToName, transferAmount, transferReason, currentUser.uid, currentUser.email);

    setBankingAccounts(res);
  };

  const closeBankingAccount = async (bankingAccountName) => {
    const res = await closeBankingAccountHelper(bankingAccounts, bankingAccountName, currentUser.uid, currentUser.email);

    setBankingAccounts(res);
  };

  // set default banking accounts values
  const setDefaultBankingAccountsValues = () => {
    setBankingAccounts(setDefaultBankingAccountsValuesHelper());
  };

  // set default banking summary values
  const setDefaultBankingSummaryValues = () => {
    setBankingSummary(setDefaultBankingSummaryValuesHelper());
  };

  const updateBankingAccountsAndSummary = () => {
    putBankingAccountsData(currentUser.uid, currentUser.email, bankingAccounts);
    putBankingSummaryData(currentUser.uid, currentUser.email, bankingSummary);
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