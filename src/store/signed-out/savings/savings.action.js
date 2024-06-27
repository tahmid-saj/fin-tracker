import { validateSavingsAccountCreation, validateSavingsAccountUpdate } from "../../../utils/validations/savings.validation";
import { calculateSavings } from "../../../utils/calculations/savings.calculations";
import { createAction } from "../../../utils/reducer/reducer.utils";
import { SAVINGS_ACTION_TYPES } from "./savings.types";

// helper functions

const createSavingsAccountHelper = (savingsAccounts, savingsAccount) => {
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

const updateSavingsAccountHelper = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount) => {
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

const closeSavingsAccountHelper = (savingsAccounts, closingSavingsAccountName) => {
  // return savingsAccounts without the closingSavingsAccountName
  return savingsAccounts.filter(account => account.savingsAccountName !== closingSavingsAccountName);
};

const getSavingsAccountInfoHelper = (savingsAccounts, savingsAccountName) => {
  // return the account with the given savingsAccountName
  return savingsAccounts.find(account => String(account.savingsAccountName) === String(savingsAccountName));
};

// actions

export const createSavingsAccount = (savingsAccounts, savingsAccount) => {
  const newSavingsAccounts = createSavingsAccountHelper(savingsAccounts, savingsAccount)
  return createAction(SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS, newSavingsAccounts)
};

export const updateSavingsAccount = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount) => {
  const newSavingsAccounts = updateSavingsAccountHelper(savingsAccounts, originalSavingsAccountName, updatedSavingsAccount)
  return createAction(SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS, newSavingsAccounts)
};

export const closeSavingsAccount = (savingsAccounts, closingSavingsAccountName) => {
  const newSavingsAccounts = closeSavingsAccountHelper(savingsAccounts, closingSavingsAccountName)
  return createAction(SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS, newSavingsAccounts)
};

export const getSavingsAccountInfo = (savingsAccounts, savingsAccountName) => {
  return getSavingsAccountInfoHelper(savingsAccounts, savingsAccountName);
};

export const setSavingsAccountsSummary = (savingsAccountsSummary) => {
  return createAction(SAVINGS_ACTION_TYPES.SET_SAVINGS_ACCOUNTS_SUMMARY, savingsAccountsSummary)
}