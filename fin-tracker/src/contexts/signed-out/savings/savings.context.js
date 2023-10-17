import { createContext, useState, useEffect } from "react";

// helper functions

// validation functions
const validateSavingsAccountCreation = (savingsAccounts, savingsAccount) => {
  const savingsAccountExists = savingsAccounts.find((account) => account.savingsAccountName === savingsAccount.savingsAccountName);

  if (savingsAccountExists) {
    console.log("Savings account already exists");
    return true;
  }

  // validating if savingsAccount fields are correct

  // strings
  if (!(/^[A-Za-z0-9]*$/.test(String(savingsAccount.savingsAccountName)))) {
    console.log("Invalid savings account name");
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(savingsAccount.initialDeposit))) || Number(savingsAccount.initialDeposit) < 0 ||
    !(/^[0-9]*$/.test(String(savingsAccount.monthlyContribution))) || Number(savingsAccount.monthlyContribution) < 0 ||
    !(/^[0-9]*$/.test(String(savingsAccount.contributionPeriod))) || Number(savingsAccount.contributionPeriod) < 0 ||
    !(/^[0-9]*$/.test(String(savingsAccount.apy))) || Number(savingsAccount.apy) < 0) {
      console.log("Invalid initial deposit / monthly contribution / contribution period / apy");
      return true;
  }

  return false;
};

const validateSavingsAccountUpdate = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount) => {
  // validate fields of updatedInvestment
  
  // strings
  if (!(/^[A-Za-z0-9]*$/.test(String(updatedSavingsAccount.savingsAccountName)))) {
    console.log("Invalid savings account name");
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(updatedSavingsAccount.initialDeposit))) || Number(updatedSavingsAccount.initialDeposit) < 0 ||
    !(/^[0-9]*$/.test(String(updatedSavingsAccount.monthlyContribution))) || Number(updatedSavingsAccount.monthlyContribution) < 0 ||
    !(/^[0-9]*$/.test(String(updatedSavingsAccount.contributionPeriod))) || Number(updatedSavingsAccount.contributionPeriod) < 0 ||
    !(/^[0-9]*$/.test(String(updatedSavingsAccount.apy))) || Number(updatedSavingsAccount.apy) < 0) {
      console.log("Invalid initial deposit / monthly contribution / contribution period / apy");
      return true;
  }

  // validate if updatedInvestment.investmentName already exists in investments
  if (savingsAccounts.find(account => (String(account.savingsAccountName) === String(updatedSavingsAccount.savingsAccountName)) &&
                                      String(updatedSavingsAccount.savingsAccountName) !== String(originalSavingsAccountName))) {
    return true;
  }

  return false;
};

// helpers
const createSavingsAccountHelper = (savingsAccounts, savingsAccount) => {
  // validating if savingsAccount exists in savingsAccounts
  if (validateSavingsAccountCreation(savingsAccounts, savingsAccount)) return savingsAccounts;

  console.log(savingsAccount.savingsAccountName);
  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest

  // add savingsAccount to savingsAccounts
  return [ ...savingsAccounts, 
    {
      savingsAccountName: String(savingsAccount.savingsAccountName),
      initialDeposit: Number(savingsAccount.initialDeposit),
      startDate: String(savingsAccount.startDate),
      monthlyContribution: Number(savingsAccount.monthlyContribution),
      contributionPeriod: Number(savingsAccount.contributionPeriod),
      contributionInterval: String(savingsAccount.contributionInterval),
      apy: Number(savingsAccount.apy),

      totalSavings: 0,
      totalContribution: 0,
      totalInterest: 0,
    }];
};

const updateSavingsAccountHelper = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount) => {
  // validate if the fields in updatedSavingsAccount are valid and the is not already another savingsAccount with the same name
  if (validateSavingsAccountUpdate(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount)) return savingsAccounts;

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
  return savingsAccounts.find(account => String(account.savingsAccountName) === String(savingsAccountName));
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
