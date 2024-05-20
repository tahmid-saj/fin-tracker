import { errorOnInvalidMortgageInput,
  errorOnInvalidCurrencyConverterInput, errorOnInvalidExchangeRateInput
} from "../errors/useful-tools.errors";

import { DOWNPAYMENT_FLAG_OPTIONS } from "../constants/useful-tools.constants";

// useful tools validation functions

// mortgage calculator
export const validateMortgageInput = (mortgageInput) => {
  if (mortgageInput.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.no) {
    if (!(/^[0-9]*$/.test(String(mortgageInput.loanAmount))) || Number(mortgageInput.loanAmount) <= 0) {
      errorOnInvalidMortgageInput();
      return true;
    }
  } else if (mortgageInput.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.yes) {
    if (!(/^[0-9]*$/.test(String(mortgageInput.homeValue))) || Number(mortgageInput.homeValue) <= 0 ||
      !(/^[0-9]*$/.test(String(mortgageInput.downpayment))) || Number(mortgageInput.downpayment) <= 0) {
      errorOnInvalidMortgageInput();
      return true;
    }
  }

  if (!(/^[0-9]*$/.test(String(mortgageInput.interestRate))) || Number(mortgageInput.interestRate) <= 0 ||
    !(/^[0-9]*$/.test(String(mortgageInput.durationYears))) || Number(mortgageInput.durationYears) <= 0) {
      errorOnInvalidMortgageInput();
      return true;
  }

  if ((mortgageInput.monthlyHoa !== "" && (!(/^[0-9]*$/.test(String(mortgageInput.monthlyHoa))) || Number(mortgageInput.monthlyHoa) <= 0)) ||
    (mortgageInput.annualPropertyTax !== "" && (!(/^[0-9]*$/.test(String(mortgageInput.annualPropertyTax))) || Number(mortgageInput.annualPropertyTax) <= 0)) ||
    (mortgageInput.annualHomeInsurance !== "" && (!(/^[0-9]*$/.test(String(mortgageInput.annualHomeInsurance))) || Number(mortgageInput.annualHomeInsurance) <= 0))) {
    errorOnInvalidMortgageInput();
    return true;
  }

  return false
}

// currency converter
export const validateCurrencyConverterInput = (currencyInput) => {
  if (!(/^[0-9]*$/.test(String(currencyInput.fromCurrencyAmount))) || Number(currencyInput.fromCurrencyAmount) <= 0) {
    errorOnInvalidCurrencyConverterInput()
    return true
  }

  // strings
  if (!(/^[A-Z]*$/.test(String(currencyInput.fromCurrency))) || !(/^[A-Z]*$/.test(String(currencyInput.toCurrency)))) {
    errorOnInvalidCurrencyConverterInput();
    return true;
  }

  return false
}

// exchange rate
export const validateExchangeRateInput = (currencyInput) => {
  // strings
  if (!(/^[A-Z]*$/.test(String(currencyInput.fromCurrency))) || !(/^[A-Z]*$/.test(String(currencyInput.toCurrency)))) {
    errorOnInvalidExchangeRateInput();
    return true;
  }

  return false
}