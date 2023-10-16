import { createContext, useState, useEffect } from "react";

// helper functions

// validation functions
const validateBankingAccountCreation = (bankingAccounts, bankingAccountName) => {
  // validating if bankingAccountName exists in bankingAccounts
  const bankingAccountExists = bankingAccounts.find((account) => account.name === bankingAccountName);

  if (bankingAccountExists) {
    console.log("Banking account already exists")
    return bankingAccountExists;
  };

  // validating if bankingAccountName is valid
  if (!(/^[A-Za-z0-9]*$/.test(String(bankingAccountName)))) {
    console.log("Banking account name is invalid")
    return true;
  }

  return false;
};

const validateDepositAmount = (bankingAccounts, bankingAccountName, amount) => {
  if (!(/^[0-9]*$/.test(String(amount))) || amount <= 0) {
    console.log("Invalid transaction amount");
    return true;
  };

  return false;
};

const validateWithdrawalAmount = (bankingAccounts, bankingAccountName, amount) => {
  const currentBalance = bankingAccounts.find(account => account.name === String(bankingAccountName)).currentBalance;

  if (!(/^[0-9]*$/.test(String(amount))) || amount <= 0 || amount > currentBalance) {
    console.log("Invalid transaction amount")
    return true;
  };

  return false;
};

const validateBankingAccountTransfer = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount) => {
  // validating bankingAccountTransferToName exists in bankingAccounts
  if (!bankingAccounts.find(account => account.name === String(bankingAccountTransferToName))) {
    console.log("Banking account does not exist");
    console.log(bankingAccounts);
    console.log(bankingAccountTransferToName);
    return true;
  };

  // validating bankingAccountTransferToName is not equal to bankingAccountTransferFromName
  if (String(bankingAccountTransferFromName) === String(bankingAccountTransferToName)) {
    console.log("Banking account cannot be the same");
    return true;
  }

  // validating transferAmount is greater than 0 and less than less than currentBalance of bankingAccountTransferFromName
  const transferFromAccountCurrentBalance = bankingAccounts.find(account => account.name === String(bankingAccountTransferFromName)).currentBalance;

  if (transferAmount <= 0 || transferAmount > transferFromAccountCurrentBalance) {
    console.log("Invalid transfer amount");
    return true;
  };

  return false;
};

// helpers
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
            type: "DEPOSIT", 
          }
        ] 
      } : account;
  });

  return updatedBankingAccounts;
};

const withdrawFromBankingAccountHelper = (bankingAccounts, bankingAccountName, withdrawAmount) => {
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
            type: "WITHDRAWAL",
          } 
        ]
      } : account;
  });

  return updatedBankingAccounts;
};

const transferToBankingAccountHelper = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount) => {
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
            type: "WITHDRAWAL_TRANSFER"
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

    console.log(bankingAccounts);

    setBankingSummary({ newAllBankingBalance: newAllBankingBalance, 
                        newAllBankingIn: newAllBankingIn, 
                        newAllBankingOut: newAllBankingOut });
  }, [bankingAccounts]);

  const createBankingAccount = (bankingAccountName) => {
    setBankingAccounts(createBankingAccountHelper(bankingAccounts, bankingAccountName));
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
    withdrawFromBankingAccount, transferToBankingAccount, closeBankingAccount, bankingSummary };

  return (
    <BankingContext.Provider
      value={ value }>
      { children }
    </BankingContext.Provider>
  );
};