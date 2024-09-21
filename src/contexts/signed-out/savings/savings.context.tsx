import React, { createContext, useState, useEffect, ReactNode, FC } from "react";

import { validateSavingsAccountCreation, validateSavingsAccountUpdate } from "../../../utils/validations/savings.validation";
import { calculateSavings } from "../../../utils/calculations/savings.calculations";
import { SavingsAccount, SavingsCalculationRecord, SavingsAccountsSummary, SavingsContextType, SavingsProviderProps } from "./savings.types"

// helper functions

const createSavingsAccountHelper = (savingsAccounts: SavingsAccount[], savingsAccount: SavingsAccount): SavingsAccount[] => {
  // validating if savingsAccount exists in savingsAccounts
  if (validateSavingsAccountCreation(savingsAccounts, savingsAccount)) return savingsAccounts;

  
  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest

  const calculation = calculateSavings({
    initialDeposit: Number(savingsAccount.initialDeposit),
    startDate: String(savingsAccount.startDate),
    monthlyContribution: Number(savingsAccount.monthlyContribution),
    contributionPeriod: Number(savingsAccount.contributionPeriod),
    contributionInterval: String(savingsAccount.contributionInterval),
    apy: Number(savingsAccount.apy)
  });

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

      totalSavings: calculation.totalSavings,
      totalContribution: calculation.totalContribution,
      totalInterest: calculation.totalInterest,

      savings: calculation.savings
    }];
};

const updateSavingsAccountHelper = (savingsAccounts: SavingsAccount[], originalSavingsAccountName: string, 
  updatedSavingsAccount: SavingsAccount): SavingsAccount[] => {
  // validate if the fields in updatedSavingsAccount are valid and the is not already another savingsAccount with the same name
  if (validateSavingsAccountUpdate(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount)) return savingsAccounts;

  // TODO: need a helper function to update totalSavings, totalContribution, totalInterest

  // update savingsAccounts with updatedSavingsAccount for the account with account.savingsAccountName === originalSavingsAccountName
  const updatedSavingsAccounts = savingsAccounts.map((account) => {
    if (account.savingsAccountName === originalSavingsAccountName) {
      const calculation = calculateSavings({
        initialDeposit: Number(updatedSavingsAccount.initialDeposit),
        startDate: String(updatedSavingsAccount.startDate),
        monthlyContribution: Number(updatedSavingsAccount.monthlyContribution),
        contributionPeriod: Number(updatedSavingsAccount.contributionPeriod),
        contributionInterval: String(updatedSavingsAccount.contributionInterval),
        apy: Number(updatedSavingsAccount.apy)
      });

      return {
        ...updatedSavingsAccount,

        totalSavings: calculation.totalSavings,
        totalContribution: calculation.totalContribution,
        totalInterest: calculation.totalInterest,

        savings: calculation.savings
      }
    }

    return account;
  });

  return updatedSavingsAccounts;
};

const closeSavingsAccountHelper = (savingsAccounts: SavingsAccount[], closingSavingsAccountName: string): SavingsAccount[] => {
  // return savingsAccounts without the closingSavingsAccountName
  return savingsAccounts.filter(account => account.savingsAccountName !== closingSavingsAccountName);
};

const getSavingsAccountInfoHelper = (savingsAccounts: SavingsAccount[], savingsAccountName: string): SavingsAccount | undefined => {
  // return the account with the given savingsAccountName
  return savingsAccounts.find(account => String(account.savingsAccountName) === String(savingsAccountName));
};

// initial state
export const SavingsContext = createContext<SavingsContextType>({
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

  //     savings: [
  //       {
        //  currentDate: ,
        //  interestEarned: ,
        //  totalInterestEarned: ,
        //  balance: 
  //       } 
  //     ]  
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
export const SavingsProvider: FC<SavingsProviderProps> = ({ children }) => {
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[] | []>([]);
  const [savingsAccountsSummary, setSavingsAccountsSummary] = useState<SavingsAccountsSummary | {}>({});

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

    

    setSavingsAccountsSummary({
      currentAllSavingsAccountsBalance: newAllSavingsAccountsBalance,
      totalAllContribution: newTotalAllContribution,
      totalAllInterest: newAllInterest,
    });
  }, [savingsAccounts]);

  const createSavingsAccount = (savingsAccount: SavingsAccount) => {
    setSavingsAccounts(createSavingsAccountHelper(savingsAccounts, savingsAccount));
  };

  const updateSavingsAccount = (originalSavingsAccountName: string, updatedSavingsAccount: SavingsAccount) => {
    setSavingsAccounts(updateSavingsAccountHelper(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount));
  };

  const closeSavingsAccount = (closingSavingsAccountName: string) => {
    setSavingsAccounts(closeSavingsAccountHelper(savingsAccounts, closingSavingsAccountName));
  };

  const getSavingsAccountInfo = (savingsAccountName: string) => {
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
