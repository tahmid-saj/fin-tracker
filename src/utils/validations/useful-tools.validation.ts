import { errorOnInvalidMortgageInput,
  errorOnInvalidCurrencyConverterInput, errorOnInvalidExchangeRateInput
} from "../errors/useful-tools.errors";

import { DOWNPAYMENT_FLAG_OPTIONS } from "../constants/useful-tools.constants";
import { REGEX_PATTERNS } from "../constants/regex.constants";
import { CurrencyConversionInput, ExchangeRateInput, MortgageInput } from "../../contexts/shared/useful-tools/useful-tools.types";

// useful tools validation functions

// mortgage calculator
export const validateMortgageInput = (mortgageInput: MortgageInput): boolean => {
  if (mortgageInput.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.no) {
    if (!(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.loanAmount))) || Number(mortgageInput.loanAmount) <= 0) {
      errorOnInvalidMortgageInput();
      return true;
    }
  } else if (mortgageInput.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.yes) {
    if (!(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.homeValue))) || Number(mortgageInput.homeValue) <= 0 ||
      !(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.downpayment))) || Number(mortgageInput.downpayment) <= 0) {
      errorOnInvalidMortgageInput();
      return true;
    }
  }

  if (!(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.interestRate))) || Number(mortgageInput.interestRate) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.durationYears))) || Number(mortgageInput.durationYears) <= 0) {
      errorOnInvalidMortgageInput();
      return true;
  }

  if ((mortgageInput.monthlyHoa && (!(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.monthlyHoa))) || Number(mortgageInput.monthlyHoa) <= 0)) ||
    (mortgageInput.annualPropertyTax && (!(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.annualPropertyTax))) || Number(mortgageInput.annualPropertyTax) <= 0)) ||
    (mortgageInput.annualHomeInsurance && (!(REGEX_PATTERNS.floatNumbers.test(String(mortgageInput.annualHomeInsurance))) || Number(mortgageInput.annualHomeInsurance) <= 0))) {
    errorOnInvalidMortgageInput();
    return true;
  }

  return false
}

// currency converter
export const validateCurrencyConverterInput = (currencyInput: CurrencyConversionInput): boolean => {
  if (!(REGEX_PATTERNS.floatNumbers.test(String(currencyInput.fromCurrencyAmount))) || Number(currencyInput.fromCurrencyAmount) <= 0) {
    errorOnInvalidCurrencyConverterInput()
    return true
  }

  // strings
  if (!(REGEX_PATTERNS.currency.test(String(currencyInput.fromCurrency))) || !(REGEX_PATTERNS.currency.test(String(currencyInput.toCurrency)))) {
    errorOnInvalidCurrencyConverterInput();
    return true;
  }

  return false
}

// exchange rate
export const validateExchangeRateInput = (currencyInput: ExchangeRateInput): boolean => {
  // strings
  if (!(REGEX_PATTERNS.currency.test(String(currencyInput.fromCurrency))) || !(REGEX_PATTERNS.currency.test(String(currencyInput.toCurrency)))) {
    errorOnInvalidExchangeRateInput();
    return true;
  }

  return false
}