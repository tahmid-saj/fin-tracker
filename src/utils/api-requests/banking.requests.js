import { errorOnGetBankingAccountsData, errorOnGetBankingSummaryData,
  errorOnBankingAccountCreate, errorOnBankingAccountTransaction, errorOnBankingAccountClose,
  errorOnPutBankingAccountsData, errorOnPutBankingSummaryData } from "../errors/banking.errors";

import { TRANSACTION_TYPES } from "../constants/banking.constants";

// banking api requests

// getting banking accounts and summary data on sign in
export const getBankingAccountsData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    console.log(error);
    errorOnGetBankingAccountsData();
  }
};

export const getBankingSummaryData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_BANKING_SUMMARY}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    console.log(error);
    errorOnGetBankingSummaryData();
  }
};

// banking operations
export const postBankingAccountCreate = async (userId, email, bankingAccountName) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_CREATE}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: String(bankingAccountName)
    });
  
    return response.status;
  } catch (error) {
    console.log(error);
    errorOnBankingAccountCreate();
  }
};

export const postBankingAccountTransaction = async (userId, email, transactionInfo) => {
  if (transactionInfo.type === TRANSACTION_TYPES.transfer) {
    try {
      console.log(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_TRANSACTION}`);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_TRANSACTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bankingAccountName: transactionInfo.name,
          transferTo: transactionInfo.transferTo,
          amount: transactionInfo.amount,
          reason: transactionInfo.reason,
          type: transactionInfo.type
        })
      });

      return response.status;
    } catch (error) {
      console.log(error);
      errorOnBankingAccountTransaction();
    }
  } else if (transactionInfo.type === TRANSACTION_TYPES.deposit || transactionInfo.type === TRANSACTION_TYPES.withdrawal) {
    try {
      console.log(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_TRANSACTION}`);

      const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_TRANSACTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bankingAccountName: transactionInfo.name,
          amount: transactionInfo.amount,
          reason: transactionInfo.reason,
          type: transactionInfo.type
        })
      });
  
      return response.status;
    } catch (error) {
      console.log(error);
      errorOnBankingAccountTransaction();
    }
  }
};

export const deleteBankingAccount = async (userId, email, bankingAccountName) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_DELETE_BANKING_ACCOUNT_CLOSE}`)
  
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_DELETE_BANKING_ACCOUNT_CLOSE}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: String(bankingAccountName),
    });

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnBankingAccountClose();
  }
};

// updating banking accounts and summary data on sign out
export const putBankingAccountsData = async (userId, email, bankingAccounts) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`);

    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bankingAccounts: bankingAccounts
      })
    })

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnPutBankingAccountsData();
  }
};

export const putBankingSummaryData = async (userId, email, bankingSummary) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_BANKING_SUMMARY}/${userId}/${email}`);

    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_SUMMARY}/${userId}/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bankingSummary: bankingSummary
      })
    })

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnPutBankingSummaryData();
  }
}
