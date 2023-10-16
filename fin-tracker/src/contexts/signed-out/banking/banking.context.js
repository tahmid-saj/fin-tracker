import { createContext, useState, useEffect } from "react";

// helper functions
const validateBankingAccountCreation = (bankingAccounts, bankingAccountName) => {
  const bankingAccountExists = bankingAccounts.find((account) => account.name === bankingAccountName);

  if (bankingAccountExists) console.log("banking account already exists")

  return bankingAccountExists;
};

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

const depositToBankingAccountHelper = (bankingAccounts, bankingAccountName, depositAmount) => {
  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ? 
      { 
        ...account, 
        currentBalance: account.currentBalance + depositAmount, 
        totalIn: account.totalIn + depositAmount,
        transactions: [ 
          ...account.transactions, 
          {
            amount: depositAmount,
            type: "DEPOSIT", 
          }
        ] 
      } : account;
  });

  return updatedBankingAccounts;
};

const withdrawFromBankingAccountHelper = (bankingAccounts, bankingAccountName, withdrawAmount) => {
  // update currentBalance, totalOut and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ?
      {
        ...account,
        currentBalance: account.currentBalance - withdrawAmount,
        totalOut: account.totalOut + withdrawAmount,
        transactions: [ 
          ...account.transactions,
          {
            amount: withdrawAmount, 
            type: "WITHDRAWAL=",
          } 
        ]
      } : account;
  });

  return updatedBankingAccounts;
};

const transferToBankingAccountHelper = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount) => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName

  // update bankingAccountTransferFromName and bankingAccountTransferToName in bankingAccounts
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    if (account.name === bankingAccountTransferFromName) {
      return {
        ...account,
        currentBalance: account.currentBalance - transferAmount,
        totalOut: account.totalOut + transferAmount,
        transactions: [
          ...account.transactions,
          {
            amount: transferAmount,
            type: "WITHDRAWAL_TRANSFER"
          }
        ]
      }
    } else if (account.name === bankingAccountTransferToName) {
      return {
        ...account,
        currentBalance: account.currentBalance + transferAmount,
        totalIn: account.totalIn + transferAmount,
        transactions: [
          ...account.transactions,
          {
            amount: transferAmount,
            type: "DEPOSIT_TRANSFER"
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
  //         type: "WITHDRAW"
  //       }
  //     ],
  //   }
  // ]

  createBankingAccount: () => {},
  depositToBankingAccount: () => {},
  withdrawFromBankingAccount: () => {},
  transferToBankingAccount: () => {},
  closeBankingAccount: () => {},

  bankingSummary: {}
  // bankingSummary structure:
  // {
  //   currentAllBankingBalance: 105,
  //   totalAllBankingIn: 120,
  //   totalAllBankingOut: -15,
  // }
});

// context component
export const BankingProvider = ({ children }) => {
  const [bankingAccounts, setBankingAccounts] = useState([]);
  const [bankingSummary, setBankingSummary] = useState({});

  useEffect(() => {
    const newAllBankingBalance = bankingAccounts.reduce((allBankingBalance, { currentBalance }) => {
      return allBankingBalance + currentBalance;
    }, 0);

    const newAllBankingIn = bankingAccounts.reduce((allBankingIn, { totalIn }) => {
      return allBankingIn + totalIn;
    }, 0);

    const newAllBankingOut = bankingAccounts.reduce((allBankingOut, { totalOut }) => {
      return allBankingOut + totalOut;
    }, 0);

    setBankingSummary({ newAllBankingBalance, newAllBankingIn, newAllBankingOut});
  }, [bankingAccounts]);

  const createBankingAccount = (bankingAccountName) => {
    const helperRes = createBankingAccountHelper(bankingAccounts, bankingAccountName);
    console.log(helperRes);
    setBankingAccounts(helperRes);
  };

  const depositToBankingAccount = (bankingAccountName, depositAmount) => {
    setBankingAccounts(depositToBankingAccountHelper(bankingAccounts, bankingAccountName, depositAmount));
  };

  const withdrawFromBankingAccount = (bankingAccountName, withdrawAmount) => {
    setBankingAccounts(withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, withdrawAmount));
  };

  const transferToBankingAccount = (bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount) => {
    setBankingAccounts(transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount));
  };

  const closeBankingAccount = (bankingAccountName) => {
    setBankingAccounts(closeBankingAccountHelper(bankingAccounts, bankingAccountName));
  };

  const value = { bankingAccounts, createBankingAccount, depositToBankingAccount, 
    withdrawFromBankingAccount, transferToBankingAccount, closeBankingAccount };

  return (
    <BankingContext.Provider
      value={ value }>
      { children }
    </BankingContext.Provider>
  );
};