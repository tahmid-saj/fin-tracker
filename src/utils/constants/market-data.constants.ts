// market data constants

export enum MARKET_DATA_TYPES {
  stocks = "Stocks",
  indices = "Indices",
  crypto = "Crypto",
  currencies = "Currencies"
}

export const DEFAULT_MARKET_DATA = undefined

export const MARKET_DATA_SEARCH_QUERY_MULTIPLIER = 1

export const MARKET_DATA_CRYPTO_PREFIX = "X:"
export const MARKET_DATA_FOREX_PREFIX = "C:"

export const MARKET_DATA_INTERVALS = {
  "Hour": "Hourly",
  "Day": "Daily",
  "Week": "Weekly",
  "Month": "Monthly" 
}