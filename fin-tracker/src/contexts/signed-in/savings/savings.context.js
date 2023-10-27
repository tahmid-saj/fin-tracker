import { createContext, useState, useEffect, useContext } from "react";

import { validateSavingsAccountCreation, validateSavingsAccountUpdate } from "../../../utils/validations/savings.validation";
import { calculateSavingsSummary } from "../../../utils/calculations/savings.calculations";

import { UserContext } from "../../shared/user/user.context";

import { getSavingsAccountsData, getSavingsAccountsSummaryData,
  postSavingsAccountCreate, putSavingsAccountData, deleteSavingsAccount,
  putSavingsAccountsData, putSavingsAccountsSummaryData } from "../../../utils/api-requests/savings.requests";

import { DEFAULT_SAVINGS_ACCOUNTS, DEFAULT_SAVINGS_ACCOUNTS_SUMMARY } from "../../../utils/constants/savings.constants";

// helper functions

const createSavingsAccountHelper = (savingsAccounts, savingsAccount, userId, email) => {
  // validating if savingsAccount exists in savingsAccounts
  if (validateSavingsAccountCreation(savingsAccounts, savingsAccount)) return savingsAccounts;

  console.log(savingsAccount.savingsAccountName);
  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest

  const summary = calculateSavingsSummary(savingsAccount);

  const savingsAccountInfo = {
    ...savingsAccount,

    totalSavings: summary.totalSavings,
    totalContribution: summary.totalContribution,
    totalInterest: summary.totalInterest,
  }

  postSavingsAccountCreate(userId, email, savingsAccountInfo);

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

      totalSavings: summary.totalSavings,
      totalContribution: summary.totalContribution,
      totalInterest: summary.totalInterest,
    }
  ];
};

const updateSavingsAccountHelper = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount, userId, email) => {
  // validate if the fields in updatedSavingsAccount are valid and the is not already another savingsAccount with the same name
  if (validateSavingsAccountUpdate(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount)) return savingsAccounts;

  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest
  const summary = calculateSavingsSummary(updatedSavingsAccount);
  
  const originalSavingsAccount = savingsAccounts.find((savingsAccount) => {
    return savingsAccount.savingsAccountName === originalSavingsAccountName;
  });

  const savingsAccountInfo = {
    originalSavingsAccountInfo: originalSavingsAccount,
    updatedSavingsAccountInfo: {
      ...updatedSavingsAccount,

      totalSavings: summary.totalSavings,
      totalContribution: summary.totalContribution,
      totalInterest: summary.totalInterest,
    }
  };
  putSavingsAccountData(userId, email, savingsAccountInfo);

  // update savingsAccounts with updatedSavingsAccount for the account with account.savingsAccountName === originalSavingsAccountName
  const updatedSavingsAccounts = savingsAccounts.map((account) => {
    if (account.savingsAccountName === originalSavingsAccountName) {
      
      return {
        ...updatedSavingsAccount,

        totalSavings: summary.totalSavings,
        totalContribution: summary.totalContribution,
        totalInterest: summary.totalInterest,
      }
    }

    return account;
  });

  return updatedSavingsAccounts;
};

const closeSavingsAccountHelper = (savingsAccounts, closingSavingsAccountName, userId, email) => {
  deleteSavingsAccount(userId, email, closingSavingsAccountName);

  // return savingsAccounts without the closingSavingsAccountName
  return savingsAccounts.filter(account => account.savingsAccountName !== closingSavingsAccountName);
};

const getSavingsAccountInfoHelper = (savingsAccounts, savingsAccountName) => {
  // return the account with the given savingsAccountName
  return savingsAccounts.find(account => String(account.savingsAccountName) === String(savingsAccountName));
};

// set default savings accounts values
const setDefaultSavingsAccountsValuesHelper = () => {
  return DEFAULT_SAVINGS_ACCOUNTS;
};

// set default savings accounts summary values
const setDefaultSavingsAccountsSummaryValuesHelper = () => {
  return DEFAULT_SAVINGS_ACCOUNTS_SUMMARY;
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

  // signing out
  setDefaultSavingsAccountsValues: () => {},
  setDefaultSavingsAccountsSummaryValues: () => {},
  updateSavingsAccountsAndSummary: () => {},
});

// context component
export const SavingsProvider = ({ children }) => {
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [savingsAccountsSummary, setSavingsAccountsSummary] = useState({});

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // TODO: move below to calculations
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

  useEffect(() => {
    async function fetchSavingsAccountsData() {
      if (currentUser) {
        const savingsAccountsData = await getSavingsAccountsData(currentUser.uid, currentUser.email);
        const savingsAccountsSummaryData = await getSavingsAccountsSummaryData(currentUser.uid, currentUser.email);

        if (savingsAccountsData) {
          const { savingsAccounts } = await savingsAccountsData;
          setSavingsAccounts(savingsAccounts);
        }

        if (savingsAccountsSummaryData) {
          const { savingsAccountsSummary } = await savingsAccountsSummaryData;
          setSavingsAccountsSummary(savingsAccountsSummary);
        }
      } else if (!currentUser) {
        setDefaultSavingsAccountsValues();
        setDefaultSavingsAccountsSummaryValues();
      }
    }
    // TODO: uncomment when working with user sign in / sign out
    // fetchSavingsAccountsData();
  }, [currentUser]);

  const createSavingsAccount = async (savingsAccount) => {
    const res = await createSavingsAccountHelper(savingsAccounts, savingsAccount, currentUser.uid, currentUser.email);

    setSavingsAccounts(res);
  };

  const updateSavingsAccount = async (originalSavingsAccountName, updatedSavingsAccount) => {
    const res = await updateSavingsAccountHelper(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount,
      currentUser.uid, currentUser.email);

    setSavingsAccounts(res);
  };

  const closeSavingsAccount = async (closingSavingsAccountName) => {
    const res = await closeSavingsAccountHelper(savingsAccounts, closingSavingsAccountName, currentUser.uid, currentUser.email);

    setSavingsAccounts(res);
  };

  const getSavingsAccountInfo = (savingsAccountName) => {
    return getSavingsAccountInfoHelper(savingsAccounts, savingsAccountName);
  };

  // set default savings accounts
  const setDefaultSavingsAccountsValues = () => {
    setSavingsAccounts(setDefaultSavingsAccountsValuesHelper());
  };

  // set default savings accounts summary
  const setDefaultSavingsAccountsSummaryValues = () => {
    setSavingsAccountsSummary(setDefaultSavingsAccountsSummaryValuesHelper());
  };

  // update savings accounts and summary on sign out
  const updateSavingsAccountsAndSummary = () => {
    // TODO: uncomment when working on updating data from sign out
    // putSavingsAccountsData(currentUser.uid, currentUser.email, savingsAccounts);
    // putSavingsAccountsSummaryData(currentUser.uid, currentUser.email, savingsAccountsSummary);
  };

  const value = { savingsAccounts, createSavingsAccount, updateSavingsAccount,
                  closeSavingsAccount, getSavingsAccountInfo, savingsAccountsSummary,
                  setDefaultSavingsAccountsValues, setDefaultSavingsAccountsSummaryValues, updateSavingsAccountsAndSummary };

  return (
    <SavingsContext.Provider
      value={ value }>
      { children }
    </SavingsContext.Provider>
  )
};
