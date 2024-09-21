import { SavingsGoalInput } from "../../contexts/shared/savings-goal-calculator/savings-goal-calculator.types";
import { SavingsAccount } from "../../contexts/signed-in/savings/savings.types";
import { REGEX_PATTERNS } from "../constants/regex.constants";
import { errorOnSavingsAccountExists, errorOnInvalidSavingsAccountName,
        errorOnInvalidSavingsAccountInputs, 
        errorOnInvalidSavingsGoalInput} from "../errors/savings.errors";

// savings validation functions

export const validateSavingsAccountCreation = (savingsAccounts: SavingsAccount[], savingsAccount: SavingsAccount): boolean => {
  const savingsAccountExists = savingsAccounts.find((account) => account.savingsAccountName === savingsAccount.savingsAccountName);

  if (savingsAccountExists) {
    errorOnSavingsAccountExists();
    return true;
  }

  // validating if savingsAccount fields are correct

  // strings
  if (!(REGEX_PATTERNS.names.test(String(savingsAccount.savingsAccountName)))) {
    errorOnInvalidSavingsAccountName();
    return true;
  }

  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(savingsAccount.initialDeposit))) || Number(savingsAccount.initialDeposit) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(savingsAccount.monthlyContribution))) || Number(savingsAccount.monthlyContribution) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(savingsAccount.contributionPeriod))) || Number(savingsAccount.contributionPeriod) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(savingsAccount.apy))) || Number(savingsAccount.apy) < 0) {
      errorOnInvalidSavingsAccountInputs();
      return true;
  }

  return false;
};

export const validateSavingsAccountUpdate = (savingsAccounts: SavingsAccount[], originalSavingsAccountName: string, updatedSavingsAccount: SavingsAccount): boolean => {
  // validate fields of updatedInvestment
  
  // strings
  if (!(REGEX_PATTERNS.names.test(String(updatedSavingsAccount.savingsAccountName)))) {
    errorOnInvalidSavingsAccountName();
    return true;
  }

  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(updatedSavingsAccount.initialDeposit))) || Number(updatedSavingsAccount.initialDeposit) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(updatedSavingsAccount.monthlyContribution))) || Number(updatedSavingsAccount.monthlyContribution) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(updatedSavingsAccount.contributionPeriod))) || Number(updatedSavingsAccount.contributionPeriod) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(updatedSavingsAccount.apy))) || Number(updatedSavingsAccount.apy) < 0) {
      errorOnInvalidSavingsAccountInputs();
      return true;
  }

  // validate if updatedInvestment.investmentName already exists in investments
  if (savingsAccounts.find(account => (String(account.savingsAccountName) === String(updatedSavingsAccount.savingsAccountName)) &&
                                      String(updatedSavingsAccount.savingsAccountName) !== String(originalSavingsAccountName))) {
    errorOnSavingsAccountExists();
    return true;
  }

  return false;
};

// savings goal

export const validateSavingsGoalInput = (savingsGoalInput: SavingsGoalInput): boolean => {
  

  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(savingsGoalInput.savingsGoal))) || Number(savingsGoalInput.savingsGoal) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(savingsGoalInput.yearsToReachGoal))) || Number(savingsGoalInput.yearsToReachGoal) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(savingsGoalInput.interestRatePerYear))) || Number(savingsGoalInput.interestRatePerYear) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(savingsGoalInput.amountFirstDeposit))) || Number(savingsGoalInput.amountFirstDeposit) < 0) {
    errorOnInvalidSavingsGoalInput()
    return true
  }

  return false
}