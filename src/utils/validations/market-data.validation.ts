import { MarketDataQuery } from "../../contexts/shared/market-data/market-data.types"
import { errorOnMarketDataQuery, errorOnStartDateBeforeEndDate } from "../errors/market-data.errors"

// market data validation functions

export const validateMarketDataQuery = (marketDataQuery: MarketDataQuery): boolean => {
  // validating if startDate > endDate
  if (marketDataQuery.marketDataStartDate && marketDataQuery.marketDataEndDate && marketDataQuery.marketDataStartDate > marketDataQuery.marketDataEndDate) {
    errorOnStartDateBeforeEndDate()
    return true
  }

  return false
}