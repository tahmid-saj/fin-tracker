import { errorOnGetBankingAccountsData, errorOnGetBankingSummaryData,
  errorOnBankingAccountCreate, errorOnBankingAccountTransaction, errorOnBankingAccountClose,
  errorOnPutBankingAccountsData, errorOnPutBankingSummaryData } from "../errors/banking.errors";

import { TRANSACTION_TYPES } from "../constants/banking.constants";
import { BankingAccount, BankingSummary, Transaction, TransactionInfo } from "../../contexts/signed-in/banking/banking.types";

// banking api requests

// getting banking accounts and summary data on sign in
export const getBankingAccountsData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    
    errorOnGetBankingAccountsData();
  }
};

export const getBankingSummaryData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    
    errorOnGetBankingSummaryData();
  }
};

// banking operations
export const postBankingAccountCreate = async (userId: string | null | undefined, email: string | null | undefined, bankingAccountName: string): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: String(bankingAccountName)
    });
  
    return response.status;
  } catch (error) {
    
    errorOnBankingAccountCreate();
  }
};

export const postBankingAccountTransaction = async (userId: string | null | undefined, email: string | null | undefined, transactionInfo: TransactionInfo): Promise<number | undefined> => {
  if (transactionInfo.type === TRANSACTION_TYPES.transfer) {
    try {
      
      
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
      
      errorOnBankingAccountTransaction();
    }
  } else if (transactionInfo.type === TRANSACTION_TYPES.deposit || transactionInfo.type === TRANSACTION_TYPES.withdrawal) {
    try {
      
      
      let reqJSONBody: TransactionInfo = {
        bankingAccountName: transactionInfo.name,
        amount: transactionInfo.amount,
        reason: transactionInfo.reason,
        type: transactionInfo.type
      }

      if (transactionInfo.type === TRANSACTION_TYPES.withdrawal) {
        reqJSONBody = {
          ...reqJSONBody,
          addToExpenses: transactionInfo.addToExpenses  
        }
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}/${process.env.REACT_APP_API_URL_POST_BANKING_ACCOUNT_TRANSACTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqJSONBody)
      });
  
      return response.status;
    } catch (error) {
      
      errorOnBankingAccountTransaction();
    }
  }
};

export const deleteBankingAccount = async (userId: string | null | undefined, email: string | null | undefined, bankingAccountName: string): Promise<number | undefined> => {
  try {
    
  
    const response = await fetch(`${process.env.REACT_APP_API_URL_BANKING_ACCOUNTS}/${userId}/${email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: String(bankingAccountName),
    });

    return response.status;
  } catch (error) {
    
    errorOnBankingAccountClose();
  }
};

// updating banking accounts and summary data on sign out
export const putBankingAccountsData = async (userId: string | null | undefined, email: string | null | undefined, bankingAccounts: BankingAccount[]): Promise<number | undefined> => {
  try {
    

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
    
    errorOnPutBankingAccountsData();
  }
};

export const putBankingSummaryData = async (userId: string | null | undefined, email: string | null | undefined, bankingSummary: BankingSummary): Promise<number | undefined> => {
  try {
    

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
    
    errorOnPutBankingSummaryData();
  }
}
