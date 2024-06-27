import { REGEX_PATTERNS } from "../constants/regex.constants";
import { errorOnBankingAccountExists, errorOnInvalidBankAccountName, errorOnInvalidTransactionAmount, 
         errorOnBankingAccountDoesNotExist, errorOnBankingAccountCannotBeSame, errorOnInvalidTransferAmount } from "../errors/banking.errors";

// banking validation functions

export const validateBankingAccountCreation = (bankingAccounts, bankingAccountName) => {
  // validating if bankingAccountName exists in bankingAccounts
  const bankingAccountExists = bankingAccounts.find((account) => account.name === bankingAccountName);

  if (bankingAccountExists) {
    errorOnBankingAccountExists();
    return true;
  };

  // validating if bankingAccountName is valid
  if (!(REGEX_PATTERNS.names.test(String(bankingAccountName)))) {
    errorOnInvalidBankAccountName();
    return true;
  }

  return false;
};

export const validateDepositAmount = (bankingAccounts, bankingAccountName, amount) => {
  if (!(REGEX_PATTERNS.floatNumbers.test(String(amount))) || Number(amount) <= 0) {
    errorOnInvalidTransactionAmount();
    return true;
  };

  return false;
};

export const validateWithdrawalAmount = (bankingAccounts, bankingAccountName, amount) => {
  const currentBalance = bankingAccounts.find(account => account.name === String(bankingAccountName)).currentBalance;

  if (!(REGEX_PATTERNS.floatNumbers.test(String(amount))) || Number(amount) <= 0 || Number(amount) > currentBalance) {
    errorOnInvalidTransactionAmount();
    return true;
  };

  return false;
};

export const validateBankingAccountTransfer = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount) => {
  // validating bankingAccountTransferToName exists in bankingAccounts
  if (!bankingAccounts.find(account => account.name === String(bankingAccountTransferToName))) {
    errorOnBankingAccountDoesNotExist();
    
    
    return true;
  };

  // validating bankingAccountTransferToName is not equal to bankingAccountTransferFromName
  if (String(bankingAccountTransferFromName) === String(bankingAccountTransferToName)) {
    errorOnBankingAccountCannotBeSame();
    return true;
  }

  // validating transferAmount is greater than 0 and less than less than currentBalance of bankingAccountTransferFromName
  const transferFromAccountCurrentBalance = bankingAccounts.find(account => account.name === String(bankingAccountTransferFromName)).currentBalance;

  if (!(REGEX_PATTERNS.floatNumbers.test(String(transferAmount))) || Number(transferAmount) <= 0 || 
      Number(transferAmount) > Number(transferFromAccountCurrentBalance)) {
        errorOnInvalidTransferAmount();
    return true;
  };

  return false;
};
