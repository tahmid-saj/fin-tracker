import { REGEX_PATTERNS } from "../constants/regex.constants";
import { errorOnBankingAccountExists, errorOnInvalidBankAccountName, errorOnInvalidTransactionAmount, 
         errorOnBankingAccountDoesNotExist, errorOnBankingAccountCannotBeSame, errorOnInvalidTransferAmount } from "../errors/banking.errors";

import { BankingAccount, BankingSummary } from "../../contexts/signed-out/banking/banking.types";

// banking validation functions

export const validateBankingAccountCreation = (bankingAccounts: BankingAccount[], bankingAccountName: string): boolean => {
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

export const validateDepositAmount = (bankingAccounts: BankingAccount[], bankingAccountName: string, amount: number): boolean => {
  if (!(REGEX_PATTERNS.floatNumbers.test(String(amount))) || Number(amount) <= 0) {
    errorOnInvalidTransactionAmount();
    return true;
  };

  return false;
};

export const validateWithdrawalAmount = (
  bankingAccounts: BankingAccount[] | undefined, 
  bankingAccountName: string, 
  amount: number
): boolean => {
  if (!bankingAccounts) {
    return false;
  } else {
    const foundAccount = bankingAccounts.find(account => account.name === String(bankingAccountName));

    if (!foundAccount || typeof foundAccount.currentBalance === 'undefined') {
      // Handle the case where the account is not found or currentBalance is undefined
      errorOnBankingAccountDoesNotExist();
      return true;
    }

    const currentBalance = foundAccount.currentBalance;

    if (!(REGEX_PATTERNS.floatNumbers.test(String(amount))) || 
        Number(amount) <= 0 || 
        Number(amount) > currentBalance) {
      errorOnInvalidTransactionAmount();
      return true;
    }
  }

  return false;
};

export const validateBankingAccountTransfer = (
  bankingAccounts: BankingAccount[], 
  bankingAccountTransferFromName: string, 
  bankingAccountTransferToName: string, 
  transferAmount: number
): boolean => {
  // validating bankingAccountTransferToName exists in bankingAccounts
  const transferToAccount = bankingAccounts.find(account => account.name === String(bankingAccountTransferToName));

  if (!transferToAccount) {
    errorOnBankingAccountDoesNotExist();
    return true;
  }

  // validating bankingAccountTransferToName is not equal to bankingAccountTransferFromName
  if (String(bankingAccountTransferFromName) === String(bankingAccountTransferToName)) {
    errorOnBankingAccountCannotBeSame();
    return true;
  }

  // validating transferAmount is greater than 0 and less than currentBalance of bankingAccountTransferFromName
  const transferFromAccount = bankingAccounts.find(account => account.name === String(bankingAccountTransferFromName));

  if (!transferFromAccount || typeof transferFromAccount.currentBalance === 'undefined') {
    // Handle case where transferFromAccount is not found or has no currentBalance
    errorOnBankingAccountDoesNotExist();
    return true;
  }

  const transferFromAccountCurrentBalance = transferFromAccount.currentBalance;

  if (!(REGEX_PATTERNS.floatNumbers.test(String(transferAmount))) || 
      Number(transferAmount) <= 0 || 
      Number(transferAmount) > Number(transferFromAccountCurrentBalance)) {
    errorOnInvalidTransferAmount();
    return true;
  }

  return false;
};
