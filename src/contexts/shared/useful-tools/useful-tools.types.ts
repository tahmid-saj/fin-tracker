// useful-tools types
export type MortgageCalculatorResult = {
  monthly_payment: MonthlyPayment,
  annual_payment: AnnualPayment,
  total_interest_paid: number
}

export type MonthlyPayment = {
  total: number,
  mortgage: number,
  property_tax: number,
  hoa: number,
  annual_home_ins: number
}

export type AnnualPayment = {
  total: number,
  mortgage: number,
  property_tax: number,
  hoa: number,
  home_insurance: number
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