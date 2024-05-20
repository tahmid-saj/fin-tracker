import { errorOnMortgageResult, errorOnCurrencyResult } from "../errors/useful-tools.errors";
import { restClient } from "@polygon.io/client-js";

import { DOWNPAYMENT_FLAG_OPTIONS } from "../constants/useful-tools.constants";
import { MARKET_DATA_FOREX_PREFIX } from "../constants/market-data.constants";

// useful tools api requests

// helper functions
async function processMortgageResult(resJSON) {
  return {
    monthlyPayment: {
      total: resJSON.monthly_payment.total,
      mortgage: resJSON.monthly_payment.mortgage,
      propertyTax: resJSON.monthly_payment.property_tax,
      hoa: resJSON.monthly_payment.hoa,
      annualHomeInsurance: resJSON.monthly_payment.annual_home_ins,
    },
    annualPayment: {
      total: resJSON.annual_payment.total,
      mortgage: resJSON.annual_payment.mortgage,
      propertyTax: resJSON.annual_payment.property_tax,
      hoa: resJSON.annual_payment.hoa,
      homeInsurance: resJSON.annual_payment.home_insurance,
    },
    totalInterestPaid: resJSON.total_interest_paid
  }
}

// mortgage calculator
export async function getMortgageResult(mortgageInput) {
  try {
    let url;
    if (mortgageInput.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.no) {
      url = `${process.env.REACT_APP_API_NINJAS_MORTGAGE_CALCULATOR_URL}?loan_amount=${mortgageInput.loanAmount}`
    } else if (mortgageInput.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.yes) {
      url = `${process.env.REACT_APP_API_NINJAS_MORTGAGE_CALCULATOR_URL}?home_value=${mortgageInput.homeValue}&downpayment=${mortgageInput.downpayment}`
    }

    url = url + `&interest_rate=${mortgageInput.interestRate}&duration_years=${mortgageInput.durationYears}`

    if (mortgageInput.monthlyHoa !== "") {
      url = url + `&monthly_hoa=${mortgageInput.monthlyHoa}`
    } else if (mortgageInput.annualPropertyTax !== "") {
      url = url + `&annual_property_tax=${mortgageInput.annualPropertyTax}`
    } else if (mortgageInput.annualHomeInsurance !== "") {
      url = url + `&annual_home_insurance=${mortgageInput.annualHomeInsurance}`
    }

    console.log(url)

    const resMortgageResult = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": `${process.env.REACT_APP_API_NINJAS_KEY}`
      }
    })

    const resJSON = await resMortgageResult.json()
    const res = await processMortgageResult(resJSON)
    return res
  } catch (error) {
    errorOnMortgageResult()
    console.log(error)
  }
}

// currency converter
// exchange rate
const polygonRestClient = restClient(process.env.REACT_APP_POLYGON_API_KEY)

export async function getExchangeRate(currencyInput) {
  const resExchangeRate = await polygonRestClient.forex.previousClose(MARKET_DATA_FOREX_PREFIX + currencyInput.fromCurrency + currencyInput.toCurrency)
    .catch((error) => {
      errorOnCurrencyResult()
      console.log(error)
      return undefined
    })
  
  return {
    fromCurrency: String(currencyInput.fromCurrency),
    toCurrency: String(currencyInput.toCurrency),
    exchangeRate: Number(resExchangeRate.results[0].c)
  }
}