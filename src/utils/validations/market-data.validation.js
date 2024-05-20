import { errorOnMarketDataQuery, errorOnStartDateBeforeEndDate } from "../errors/market-data.errors"

// market data validation functions

export const validateMarketDataQuery = (marketDataQuery) => {
  // validating if startDate > endDate
  if (marketDataQuery.marketDataStartDate && marketDataQuery.marketDataEndDate && marketDataQuery.marketDataStartDate > marketDataQuery.marketDataEndDate) {
    errorOnStartDateBeforeEndDate()
    return true
  }

  return false
}