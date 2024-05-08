import { createContext, useEffect, useState } from "react";

import { validateMarketDataQuery } from "../../../utils/validations/market-data.validation";
import { DEFAULT_MARKET_DATA } from "../../../utils/constants/market-data.constants";

// hellper functions
const searchMarketDataHelper = (marketDataQuery) => {
  if (validateMarketDataQuery(marketDataQuery)) return DEFAULT_MARKET_DATA
  
  // api request
  return DEFAULT_MARKET_DATA
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

  const searchMarketData = (marketDataQuery) => {
    setMarketData(searchMarketDataHelper(marketDataQuery))
  } 
  
  const value = { marketData, setMarketData, searchMarketData }

  return (
    <MarketDataContext.Provider
      value={ value }>
      { children }
    </MarketDataContext.Provider>
  )
}