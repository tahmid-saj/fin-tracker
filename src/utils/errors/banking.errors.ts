// banking errors

//context
export const errorOnBankingAccountExists = () => {
  alert("Banking account already exists");
};

export const errorOnInvalidBankAccountName = () => {
  alert("Invalid bank account name");
}

export const errorOnInvalidTransactionAmount = () => {
  alert("Invalid transaction amount");
};

export const errorOnBankingAccountDoesNotExist = () => {
  alert("Banking account does not exist");
};

export const errorOnBankingAccountCannotBeSame = () => {
  alert("Banking account cannot be the same");
}

export const errorOnInvalidTransferAmount = () => {
  alert("Invalid transfer amount");
};

// api requests
export const errorOnGetBankingAccountsData = () => {
  alert("Error getting banking accounts data");
};

export const errorOnGetBankingSummaryData = () => {
  alert("Error getting banking summary data");
};

export const errorOnBankingAccountCreate = () => {
  alert("Error creating bank account");
};

export const errorOnBankingAccountTransaction = () => {
  alert("Error creating transaction");
};

export const errorOnBankingAccountClose = () => {
  alert("Error closing bank account");
};

export const errorOnPutBankingAccountsData = () => {
  alert("Error updating banking accounts data");
};

export const errorOnPutBankingSummaryData = () => {
  alert("Error updating banking summary data");
};