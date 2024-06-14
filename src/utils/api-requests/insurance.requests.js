import { errorOnGetInsurancesData, errorOnGetInsurancesSummaryData,
  errorOnInsuranceCreate, errorOnInsuranceRemove,
  errorOnPutInsurancesData, errorOnPutInsuranceSummaryData
} from "../errors/insurance.errors";

// insurances api requests

// getting insurances and summary data on sign in
export const getInsurancesData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    console.log(error)
    errorOnGetInsurancesData()
  }
}

export const getInsurancesSummaryData = async (userId, email) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INSURANCES_SUMMARY}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INSURANCES_SUMMARY}/${userId}/${email}`)

    return response.json()
  } catch (error) {
    console.log(error)
    errorOnGetInsurancesSummaryData()
  }
}

// insurances operations
export const postInsuranceCreate = async (userId, email, insurance, insuranceFor) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        insuranceFor: insurance.insuranceFor,
        insurancePayment: insurance.insurancePayment,
        insuranceInterval: insurance.insuranceInterval,
        insuranceFirstPaymentDate: insurance.insuranceFirstPaymentDate,
        insuranceEndDate: insurance.insuranceEndDate,
      })
    })

    return response.status
  } catch (error) {
    console.log(error)
    errorOnInsuranceCreate()
  }
}

export const deleteInsurance = async (userId, email, insuranceFor) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(insuranceFor)
    })

    return response.status
  } catch (error) {
    console.log(error)
    errorOnInsuranceRemove()
  }
}

// updating insurances and summary data on sign out
export const putInsurancesData = async (userId, email, insurances) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INSURANCES}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        insurances: insurances
      })
    })

    return response.status
  } catch (error) {
    console.log(error)
    errorOnPutInsurancesData()
  }
}

export const putInsurancesSummaryData = async (userId, email, insurancesSummary) => {
  try {
    console.log(`${process.env.REACT_APP_API_URL_INSURANCES_SUMMARY}/${userId}/${email}`)
    const response = await fetch(`${process.env.REACT_APP_API_URL_INSURANCES_SUMMARY}/${userId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        insurancesSummary: insurancesSummary
      })
    })

    return response.status
  } catch (error) {
    console.log(error)
    errorOnPutInsuranceSummaryData()
  }
}