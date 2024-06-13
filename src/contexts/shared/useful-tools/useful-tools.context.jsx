import { createContext, useState } from "react";
import { validateMortgageInput, validateCurrencyConverterInput, validateExchangeRateInput } from "../../../utils/validations/useful-tools.validation";
import { getMortgageResult, getExchangeRate } from "../../../utils/api-requests/useful-tools.requests";

// helper functions
const calculateMortgageHelper = async (mortgageInput) => {
  const resMortgageResult = await getMortgageResult(mortgageInput)
  return resMortgageResult
}

const convertCurrencyHelper = async (currencyInput) => {
  const resConvertCurrencyResult = await getExchangeRate(currencyInput)
  return {
    fromCurrency: resConvertCurrencyResult.fromCurrency,
    toCurrency: resConvertCurrencyResult.toCurrency,
    fromCurrencyAmount: Number(currencyInput.fromCurrencyAmount),
    toCurrencyAmount: resConvertCurrencyResult.exchangeRate * Number(currencyInput.fromCurrencyAmount)
  }
}

const findExchangeRateHelper = async (currencyInput) => {
  const resExchangeRate = await getExchangeRate(currencyInput)
  return resExchangeRate
}

// initial state
export const UsefulToolsContext = createContext({
  // mortgage calculatoe
  mortgageCalculatorResult: undefined,
  // mortgageCalculatorResult structure
  // {
  //   "monthly_payment": {
  //     "total": 898,
  //     "mortgage": 898,
  //     "property_tax": 0,
  //     "hoa": 0,
  //     "annual_home_ins": 0
  //   },
  //   "annual_payment": {
  //     "total": 10777,
  //     "mortgage": 10777,
  //     "property_tax": 0,
  //     "hoa": 0,
  //     "home_insurance": 0
  //   },
  //   "total_interest_paid": 123312
  // }

  // currency converter
  currencyConverterResult: undefined,
  // currencyConverterResult structure
  // {
  //   fromCurrency: ,
  //   toCurrency: ,
  //   fromCurrencyAmount: 
  //   toCurrencyAmount:
  // }

  // exchange rate
  exchangeRateResult: undefined,
  // exchangeRateResult structure
  // {
  //   fromCurrency: ,
  //   toCurrency: ,
  //   exchangeRate: ,
  // }
  
  calculateMortgage: () => {},
  convertCurrency: () => {},
  findExchangeRate: () => {}
})

// useful tools provider
export const UsefulToolsProvider = ({ children }) => {
  const [mortgageCalculatorResult, setMortgageCalculatorResult] = useState(undefined)
  const [currencyConverterResult, setCurrencyConverterResult] = useState(undefined)
  const [exchangeRateResult, setExchangeRateResult] = useState(undefined)

  const calculateMortgage = async (mortgageInput) => {
    if (validateMortgageInput(mortgageInput)) {
      return mortgageCalculatorResult
    } else {
      const res = await calculateMortgageHelper(mortgageInput)
      setMortgageCalculatorResult(res)
    }
  }

  const convertCurrency = async (currencyInput) => {
    if (validateCurrencyConverterInput(currencyInput)) {
      return currencyConverterResult
    } else {
      const res = await convertCurrencyHelper(currencyInput)
      setCurrencyConverterResult(res)
    }
  }

  const findExchangeRate = async (currencyInput) => {
    if (validateExchangeRateInput(currencyInput)) {
      return exchangeRateResult
    } else {
      const res = await findExchangeRateHelper(currencyInput)
      setExchangeRateResult(res)
    }
  }

  const value = { mortgageCalculatorResult, currencyConverterResult, exchangeRateResult,
    calculateMortgage, convertCurrency, findExchangeRate }
  
  return (
    <UsefulToolsContext.Provider
      value={ value }>
      { children }
    </UsefulToolsContext.Provider>
  )
}