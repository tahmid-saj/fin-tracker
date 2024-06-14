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
  if (!(/^[A-Za-z0-9]*$/.test(String(bankingAccountName)))) {
    errorOnInvalidBankAccountName();
    return true;
  }

  return false;
};

export const validateDepositAmount = (bankingAccounts, bankingAccountName, amount) => {
  if (!(/^[0-9]*$/.test(String(amount))) || Number(amount) <= 0) {
    errorOnInvalidTransactionAmount();
    return true;
  };

  return false;
};

export const validateWithdrawalAmount = (bankingAccounts, bankingAccountName, amount) => {
  const currentBalance = bankingAccounts.find(account => account.name === String(bankingAccountName)).currentBalance;

  if (!(/^[0-9]*$/.test(String(amount))) || Number(amount) <= 0 || Number(amount) > currentBalance) {
    errorOnInvalidTransactionAmount();
    return true;
  };

  return false;
};

export const validateBankingAccountTransfer = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount) => {
  // validating bankingAccountTransferToName exists in bankingAccounts
  if (!bankingAccounts.find(account => account.name === String(bankingAccountTransferToName))) {
    errorOnBankingAccountDoesNotExist();
    console.log(bankingAccounts);
    console.log(bankingAccountTransferToName);
    return true;
  };

  // validating bankingAccountTransferToName is not equal to bankingAccountTransferFromName
  if (String(bankingAccountTransferFromName) === String(bankingAccountTransferToName)) {
    errorOnBankingAccountCannotBeSame();
    return true;
  }

  // validating transferAmount is greater than 0 and less than less than currentBalance of bankingAccountTransferFromName
  const transferFromAccountCurrentBalance = bankingAccounts.find(account => account.name === String(bankingAccountTransferFromName)).currentBalance;

  if (!(/^[0-9]*$/.test(String(transferAmount))) || Number(transferAmount) <= 0 || 
      Number(transferAmount) > Number(transferFromAccountCurrentBalance)) {
        errorOnInvalidTransferAmount();
    return true;
  };

  return false;
};
