import { ReactNode } from "react";

// useful-tools types

export interface UsefulToolsContextType {
  mortgageCalculatorResult: MortgageCalculatorResult | undefined;
  currencyConverterResult: CurrencyConverterResult | undefined;
  exchangeRateResult: ExchangeRateResult | undefined;

  calculateMortgage: (mortgageInput: MortgageInput) => void;
  convertCurrency: (currencyInput: CurrencyConversionInput) => void;
  findExchangeRate: (currencyInput: ExchangeRateInput) => void;
}

export interface UsefulToolsProviderProps {
  children: ReactNode
}

export type MortgageCalculatorResult = {
  monthlyPayment: MonthlyPayment,
  annualPayment: AnnualPayment,
  totalInterestPaid: number
}

export type MonthlyPayment = {
  total: number,
  mortgage: number,
  propertyTax: number,
  hoa: number,
  annualHomeInsurance: number
}

export type AnnualPayment = {
  total: number,
  mortgage: number,
  propertyTax: number,
  hoa: number,
  homeInsurance: number
}

export type CurrencyConverterResult = {
  fromCurrency: string,
  toCurrency: string,
  fromCurrencyAmount: number,
  toCurrencyAmount: number
}

export type ExchangeRateResult = {
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
}

export type MortgageInput = {
  downpaymentFlag: string,
  loanAmount: number,
  homeValue: number,
  downpayment: number,
  interestRate: number,
  durationYears: number,
  monthlyHoa: number,
  annualPropertyTax: number,
  annualHomeInsurance: number
}

export type CurrencyConversionInput = {
  fromCurrency: string,
  fromCurrencyAmount: number,
  toCurrency: string
}

export type ExchangeRateInput = {
  fromCurrency: string,
  toCurrency: string
}