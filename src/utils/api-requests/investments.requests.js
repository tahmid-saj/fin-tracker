import { errorOnGetInvestmentsData, errorOnGetInvestmentsSummaryData,
  errorOnPostInvestmentCreate, errorOnPutInvestmentData, errorOnDeleteInvestment,
  errorOnPutInvestmentsData, errorOnPutInvestmentsSummaryData } from "../../utils/errors/investments.errors";

// investments api requests

// getting investments and summary data on sign in
export const getInvestmentsData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetInvestmentsData();
    console.log(error);
  }
};

export const getInvestmentsSummaryData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS_SUMMARY}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INVESTMENTS_SUMMARY}/${userId}/${email}`);

    return response.json();
  } catch (error) {
    errorOnGetInvestmentsSummaryData();
    console.log(error);
  }
};

// investment operations
export const postInvestmentCreate = async (userId, email, investmentInfo) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`);
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
    console.log(error);
  }
};

export const putInvestmentData = async (userId, email, investmentInfo) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`);
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
    console.log(error)
  }
};

export const deleteInvestment = async (userId, email, closingInvestmentName) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`);
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
    console.log(error);
  }
};

// updating investments and summary data on sign out
export const putInvestmentsData = async (userId, email, investments) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS}/${userId}/${email}`);
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
    console.log(error)
    errorOnPutInvestmentsData();
  }
};

export const putInvestmentsSummaryData = async (userId, email, investmentsSummary) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INVESTMENTS_SUMMARY}/${userId}/${email}`);
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
    console.log(error);
    errorOnPutInvestmentsSummaryData();
  }
};
