import { createContext, useState, useEffect } from "react";

// helper functions

// validation functions

// helpers
const createSavingsAccountHelper = (savingsAccounts, savingsAccount) => {
  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest

  // add savingsAccount to savingsAccounts
  return [ ...savingsAccounts, 
    {
      savingsAccountName: savingsAccount.savingsAccountName,
      initialDeposit: savingsAccount.initialDeposit,
      startDate: savingsAccount.startDate,
      monthlyContribution: savingsAccount.monthlyContribution,
      contributionPeriod: savingsAccount.contributionPeriod,
      contributionInterval: savingsAccount.contributionInterval,
      apy: savingsAccount.apy,

      totalSavings: 0,
      totalContribution: 0,
      totalInterest: 0,
    }];
};

const updateSavingsAccountHelper = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount) => {
  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest

  // update savingsAccounts with updatedSavingsAccount for the account with account.savingsAccountName === originalSavingsAccountName
  const updatedSavingsAccounts = savingsAccounts.map((account) => {
    if (account.savingsAccountName === originalSavingsAccountName) {
      return {
        ...updatedSavingsAccount,

        totalSavings: account.totalSavings,
        totalContribution: account.totalContribution,
        totalInterest: account.totalInterest,
      }
    }

    return account;
  });

  return updatedSavingsAccounts;
};

const closeSavingsAccountHelper = (savingsAccounts, closingSavingsAccountName) => {
  // return savingsAccounts without the closingSavingsAccountName
  return savingsAccounts.filter(account => account.savingsAccountName !== closingSavingsAccountName);
};

const getSavingsAccountInfoHelper = (savingsAccounts, savingsAccountName) => {
  // return the account with the given savingsAccountName
  return savingsAccounts.find(account => account.savingsAccountName === savingsAccountName);
};

// initial state
export const SavingsContext = createContext({
  savingsAccounts: [],
  // savingsAccounts structure
  // [
  //   {
  //     savingsAccountName: "EQBANK",
  //     initialDeposit: 1000,
  //     startDate: new Date(),
  //     monthlyContribution: 200,
  //     contributionPeriod: 1,
  //     contributionInterval: "Years",
  //     apy: 1.05,

  //     displayed in summary component
  //     totalSavings: 3000,
  //     totalContribution: 600,
  //     totalInterest: 200,
  //   }
  // ]

  createSavingsAccount: () => {},
  updateSavingsAccount: () => {},
  closeSavingsAccount: () => {},
  getSavingsAccountInfo: () => {},

  savingsAccountsSummary: {},
  // savingsAccountsSummary structure
  // {
  //   currentAllSavingsAccountsBalance: 3000,
  //   totalAllContribution: 700,
  //   totalAllInterest: 300,
  // }
});

// context component
export const SavingsProvider = ({ children }) => {
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [savingsAccountsSummary, setSavingsAccountsSummary] = useState({});

  useEffect(() => {
    const newAllSavingsAccountsBalance = savingsAccounts.reduce((allSavingsAccountsBalance, { totalSavings }) => {
      return allSavingsAccountsBalance + totalSavings;
    }, 0);

    const newTotalAllContribution = savingsAccounts.reduce((newTotalAllContribution, { totalContribution }) => {
      return newTotalAllContribution + totalContribution;
    }, 0);

    const newAllInterest = savingsAccounts.reduce((allInterest, { totalInterest }) => {
      return allInterest + totalInterest;
    }, 0);

    console.log(savingsAccounts);

    setSavingsAccountsSummary({
      currentAllSavingsAccountsBalance: newAllSavingsAccountsBalance,
      totalAllContribution: newTotalAllContribution,
      totalAllInterest: newAllInterest,
    });
  }, [savingsAccounts]);

  const createSavingsAccount = (savingsAccount) => {
    setSavingsAccounts(createSavingsAccountHelper(savingsAccounts, savingsAccount));
  };

  const updateSavingsAccount = (originalSavingsAccountName, updatedSavingsAccount) => {
    setSavingsAccounts(updateSavingsAccountHelper(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount));
  };

  const closeSavingsAccount = (closingSavingsAccountName) => {
    setSavingsAccounts(closeSavingsAccountHelper(savingsAccounts, closingSavingsAccountName));
  };

  const getSavingsAccountInfo = (savingsAccountName) => {
    return getSavingsAccountInfoHelper(savingsAccounts, savingsAccountName);
  };

  const value = { savingsAccounts, createSavingsAccount, updateSavingsAccount,
                  closeSavingsAccount, getSavingsAccountInfo, savingsAccountsSummary };

  return (
    <SavingsContext.Provider
      value={ value }>
      { children }
    </SavingsContext.Provider>
  )
};
