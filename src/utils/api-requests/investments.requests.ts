import { Investment, InvestmentInfo, InvestmentsSummary } from "../../contexts/signed-in/investments/investments.types";
import { errorOnGetInvestmentsData, errorOnGetInvestmentsSummaryData,
  errorOnPostInvestmentCreate, errorOnPutInvestmentData, errorOnDeleteInvestment,
  errorOnPutInvestmentsData, errorOnPutInvestmentsSummaryData } from "../errors/investments.errors";

// investments api requests

// getting investments and summary data on sign in
export const getInvestmentsData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetInvestmentsData();
    
  }
};

export const getInvestmentsSummaryData = async (userId: string | null | undefined, email: string | null | undefined): Promise<any> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetInvestmentsSummaryData();
    
  }
};

// investment operations
export const postInvestmentCreate = async (userId: string | null | undefined, email: string | null | undefined, 
  investmentInfo: Investment): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(investmentInfo)
    });

    return response.status;
  } catch (error) {
    errorOnPostInvestmentCreate();
    
  }
};

export const putInvestmentData = async (userId: string | null | undefined, email: string | null | undefined, 
  investmentInfo: InvestmentInfo): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(investmentInfo)
    });

    return response.status
  } catch (error) {
    errorOnPutInvestmentData();
    
  }
};

export const deleteInvestment = async (userId: string | null | undefined, email: string | null | undefined, 
  closingInvestmentName: string): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "text/plain"
        },
        body: String(closingInvestmentName)
    });

    return response.status;
  } catch (error) {
    errorOnDeleteInvestment();
    
  }
};

// updating investments and summary data on sign out
export const putInvestmentsData = async (userId: string | null | undefined, email: string | null | undefined, 
  investments: Investment[]): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        investments: investments
      })
    });

    return response.status;
  } catch (error) {
    
    errorOnPutInvestmentsData();
  }
};

export const putInvestmentsSummaryData = async (userId: string | null | undefined, email: string | null | undefined, 
  investmentsSummary: InvestmentsSummary): Promise<number | undefined> => {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS_SUMMARY}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        investmentsSummary: investmentsSummary
      })
    });

    return response.status
  } catch (error) {
    
    errorOnPutInvestmentsSummaryData();
  }
};
