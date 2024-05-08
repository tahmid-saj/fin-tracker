import { createContext, useEffect, useState } from "react";

import { validateMarketDataQuery } from "../../../utils/validations/market-data.validation";
import { DEFAULT_MARKET_DATA, MARKET_DATA_TYPES } from "../../../utils/constants/market-data.constants";

import { getStocksMarketData, getIndicesMarketData,
  getCryptoMarketData, getForexMarketData
 } from "../../../utils/api-requests/market-data.requests";

// helper functions
const searchMarketDataHelper = async (marketDataQuery) => {
  if (validateMarketDataQuery(marketDataQuery)) return DEFAULT_MARKET_DATA

  // api request
  switch (marketDataQuery.marketDataType) {
    case MARKET_DATA_TYPES.stocks:
      return await getStocksMarketData(marketDataQuery)
    case MARKET_DATA_TYPES.indices:
      return await getIndicesMarketData(marketDataQuery)
    case MARKET_DATA_TYPES.crypto:
      return await getCryptoMarketData(marketDataQuery)
    case MARKET_DATA_TYPES.currencies:
      return await getForexMarketData(marketDataQuery)
    default:
      break
  }
}

// initial state
export const MarketDataContext = createContext({
  marketData: {}
  // marketData structure
  // {
  //   marketDataType: "stocks",
  //   marketDataTicker: "AAPL",
  //   marketDataInterval: "day",
  //   marketDataStartDate: "2024-01-01",
  //   marketDataEndDate: "2024-04-01",
  //   queryResults: [
  //     {
  //       closing: "100",
  //       time: "2024-01-01"
  //     }
  //   ]
  // }
  // 
})

// context component
export const MarketDataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({})

  const searchMarketData = async (marketDataQuery) => {
    const resMarketData = await searchMarketDataHelper(marketDataQuery)
    setMarketData({
      ...marketDataQuery,
      queryResults: resMarketData
    })
  } 
  
  const value = { marketData, setMarketData, searchMarketData }

  return (
    <MarketDataContext.Provider
      value={ value }>
      { children }
    </MarketDataContext.Provider>
  )
}