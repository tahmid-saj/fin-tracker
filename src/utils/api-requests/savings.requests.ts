import { SavingsAccount, SavingsAccountInfo, SavingsAccountsSummary } from "../../contexts/signed-in/savings/savings.types";
import { errorOnGetSavingsAccountsData, errorOnGetSavingsAccountsSummaryData,
  errorOnPostSavingsAccountCreate, errorOnPutSavingsAccountData, errorOnSavingsAccountInvestment,
  errorOnPutSavingsAccountsData, errorOnPutSavingsAccountsSummaryData } from "../errors/savings.errors";

// savings accounts api requests

// getting savings accounts and summary data on sign in
export const getSavingsAccountsData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetSavingsAccountsData();
    
  }
};

export const getSavingsAccountsSummaryData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetSavingsAccountsSummaryData();
    
  }
};

// saving accounts operations
export const postSavingsAccountCreate = async (userId: string | null | undefined, email: string | null | undefined, 
  savingsAccountInfo: SavingsAccount): Promise<number | undefined> => {
  try {
    
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
    
  }
};

export const putSavingsAccountData = async (userId: string | null | undefined, email: string | null | undefined, 
  savingsAccountInfo: SavingsAccountInfo): Promise<number | undefined> => {
  try {
    
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
    
  }
};

export const deleteSavingsAccount = async (userId: string | null | undefined, email: string | null | undefined, 
  closingSavingsAccountName: string): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_SAVINGS_ACCOUNTS}/${userId}/${email}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(closingSavingsAccountName)
    });

    return response.status;
  } catch (error) {
    errorOnSavingsAccountInvestment();
    
  }
};

// updating savings accounts and summary data on sign out
export const putSavingsAccountsData = async (userId: string | null | undefined, email: string | null | undefined, 
  savingsAccounts: SavingsAccount[]): Promise<number | undefined> => {
  try {
    
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
    
    errorOnPutSavingsAccountsData();
  }
};

export const putSavingsAccountsSummaryData = async (userId: string | null | undefined, email: string | null | undefined, 
  savingsAccountsSummary: SavingsAccountsSummary): Promise<number | undefined> => {
  try {
    
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
    
    errorOnPutSavingsAccountsSummaryData();
  }
};

