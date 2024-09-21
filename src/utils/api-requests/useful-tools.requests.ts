import { CurrencyConversionInput, ExchangeRateInput, MortgageInput } from "../../contexts/shared/useful-tools/useful-tools.types";
import { errorOnMortgageResult, errorOnCurrencyResult } from "../errors/useful-tools.errors";

// mortgage calculator
export async function getMortgageResult(mortgageInput: MortgageInput): Promise<any> {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_USEFUL_TOOLS}${process.env.REACT_APP_API_URL_USEFUL_TOOLS_MORTGAGE_CALCULATOR}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mortgageInput)
    })
    const resMortgageCalculation = await response.json()

    return resMortgageCalculation.mortgageCalculation
  } catch (error) {
    
    errorOnMortgageResult()
  }
}

// currency converter
// exchange rate
export async function getExchangeRate(currencyInput: ExchangeRateInput): Promise<any> {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_USEFUL_TOOLS}${process.env.REACT_APP_API_URL_USEFUL_TOOLS_EXCHANGE_RATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currencyInput)
    })
    const resExchangeRate = await response.json()

    return resExchangeRate
  } catch (error) {
    
    errorOnCurrencyResult()
  }
}