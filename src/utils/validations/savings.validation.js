import { errorOnSavingsAccountExists, errorOnInvalidSavingsAccountName,
        errorOnInvalidSavingsAccountInputs, 
        errorOnInvalidSavingsGoalInput} from "../errors/savings.errors";

// savings validation functions

export const validateSavingsAccountCreation = (savingsAccounts, savingsAccount) => {
  const savingsAccountExists = savingsAccounts.find((account) => account.savingsAccountName === savingsAccount.savingsAccountName);

  if (savingsAccountExists) {
    errorOnSavingsAccountExists();
    return true;
  }

  // validating if savingsAccount fields are correct

  // strings
  if (!(/^[A-Za-z0-9]*$/.test(String(savingsAccount.savingsAccountName)))) {
    errorOnInvalidSavingsAccountName();
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(savingsAccount.initialDeposit))) || Number(savingsAccount.initialDeposit) < 0 ||
    !(/^[0-9]*$/.test(String(savingsAccount.monthlyContribution))) || Number(savingsAccount.monthlyContribution) < 0 ||
    !(/^[0-9]*$/.test(String(savingsAccount.contributionPeriod))) || Number(savingsAccount.contributionPeriod) <= 0 ||
    !(/^[0-9]*$/.test(String(savingsAccount.apy))) || Number(savingsAccount.apy) < 0) {
      errorOnInvalidSavingsAccountInputs();
      return true;
  }

  return false;
};

export const validateSavingsAccountUpdate = (savingsAccounts, originalSavingsAccountName, updatedSavingsAccount) => {
  // validate fields of updatedInvestment
  
  // strings
  if (!(/^[A-Za-z0-9]*$/.test(String(updatedSavingsAccount.savingsAccountName)))) {
    errorOnInvalidSavingsAccountName();
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(updatedSavingsAccount.initialDeposit))) || Number(updatedSavingsAccount.initialDeposit) < 0 ||
    !(/^[0-9]*$/.test(String(updatedSavingsAccount.monthlyContribution))) || Number(updatedSavingsAccount.monthlyContribution) < 0 ||
    !(/^[0-9]*$/.test(String(updatedSavingsAccount.contributionPeriod))) || Number(updatedSavingsAccount.contributionPeriod) <= 0 ||
    !(/^[0-9]*$/.test(String(updatedSavingsAccount.apy))) || Number(updatedSavingsAccount.apy) < 0) {
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

export const validateSavingsGoalInput = (savingsGoalInput) => {
  console.log(savingsGoalInput)

  // number
  if (!(/^[0-9]*$/.test(String(savingsGoalInput.savingsGoal))) || Number(savingsGoalInput.savingsGoal) < 0 ||
    !(/^[0-9]*$/.test(String(savingsGoalInput.yearsToReachGoal))) || Number(savingsGoalInput.yearsToReachGoal) < 0 ||
    !(/^[0-9]*$/.test(String(savingsGoalInput.interestRatePerYear))) || Number(savingsGoalInput.interestRatePerYear) < 0 ||
    !(/^[0-9]*$/.test(String(savingsGoalInput.amountFirstDeposit))) || Number(savingsGoalInput.amountFirstDeposit) < 0) {
    errorOnInvalidSavingsGoalInput()
    return true
  }

  return false
}