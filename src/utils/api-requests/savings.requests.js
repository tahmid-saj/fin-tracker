import { errorOnGetSavingsAccountsData, errorOnGetSavingsAccountsSummaryData,
  errorOnPostSavingsAccountCreate, errorOnPutSavingsAccountData, errorOnSavingsAccountInvestment,
  errorOnPutSavingsAccountsData, errorOnPutSavingsAccountsSummaryData } from "../errors/savings.errors";

// savings accounts api requests

// getting savings accounts and summary data on sign in
export const getSavingsAccountsData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetSavingsAccountsData();
    console.log(error);
  }
};

export const getSavingsAccountsSummaryData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS_SUMMARY}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetSavingsAccountsSummaryData();
    console.log(error);
  }
};

// saving accounts operations
export const postSavingsAccountCreate = async (userId, email, savingsAccountInfo) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(savingsAccountInfo)
    });

    return response.status;
  } catch (error) {
    errorOnPostSavingsAccountCreate();
    console.log(error);
  }
};

export const putSavingsAccountData = async (userId, email, savingsAccountInfo) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(savingsAccountInfo)
    });

    return response.status;
  } catch (error) {
    errorOnPutSavingsAccountData();
    console.log(error);
  }
};

export const deleteSavingsAccount = async (userId, email, closingSavingsAccountName) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(closingSavingsAccountName)
    });

    return response.statusCode;
  } catch (error) {
    errorOnSavingsAccountInvestment();
    console.log(error);
  }
};

// updating savings accounts and summary data on sign out
export const putSavingsAccountsData = async (userId, email, savingsAccounts) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        savingsAccounts: savingsAccounts
      })
    });

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnPutSavingsAccountsData();
  }
};

export const putSavingsAccountsSummaryData = async (userId, email, savingsAccountsSummary) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        savingsAccountsSummary: savingsAccountsSummary
      })
    });

    return response.status;
  } catch (error) {
    console.log(error);
    errorOnPutSavingsAccountsSummaryData();
  }
};

