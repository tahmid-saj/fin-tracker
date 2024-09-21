import React, { createContext, useEffect, useState, FC } from "react";

import { validateMarketDataQuery } from "../../../utils/validations/market-data.validation";
import { DEFAULT_MARKET_DATA, MARKET_DATA_TYPES } from "../../../utils/constants/market-data.constants";

import { getStocksMarketData, getIndicesMarketData,
  getCryptoMarketData, getForexMarketData
 } from "../../../utils/api-requests/market-data.requests";
 
import { MarketDataQuery, MarketDataQueryResult, MarketData, MarketDataProviderProps, MarketDataContextType } from "./market-data.types"

// helper functions
const searchMarketDataHelper = async (marketDataQuery: MarketDataQuery): Promise<MarketDataQueryResult[] | undefined> => {
  if (validateMarketDataQuery(marketDataQuery)) return DEFAULT_MARKET_DATA

  // api request
  let res;
  switch (marketDataQuery.marketDataType) {
    case MARKET_DATA_TYPES.stocks:
      res = await getStocksMarketData(marketDataQuery)
      break
    case MARKET_DATA_TYPES.indices:
      res = await getIndicesMarketData(marketDataQuery)
      break
    case MARKET_DATA_TYPES.crypto:
      res = await getCryptoMarketData(marketDataQuery)
      break
    case MARKET_DATA_TYPES.currencies:
      res = await getForexMarketData(marketDataQuery)
      break
    default:
      break
  }
  return res
}

// initial state
export const MarketDataContext = createContext<MarketDataContextType>({
  marketData: DEFAULT_MARKET_DATA,
  // marketData structure
  // {
  //   marketDataType: "stocks",
  //   marketDataTicker: "AAPL",
  //   marketDataInterval: "day",
  //   marketDataStartDate: "2024-01-01",
  //   marketDataEndDate: "2024-04-01",
  //   queryResults: [
  //     {
  //       closing: 100,
  //       time: "2024-01-01"
  //     }
  //   ]
  // }
  // 

  searchMarketData: () => {}
})

// context component
export const MarketDataProvider: FC<MarketDataProviderProps> = ({ children }) => {
  const [marketData, setMarketData] = useState<MarketData | undefined>(DEFAULT_MARKET_DATA)

  useEffect(() => {
    
  }, [marketData])

  const searchMarketData = async (marketDataQuery: MarketDataQuery) => {
    const resMarketData = await searchMarketDataHelper(marketDataQuery)
    setMarketData({
      ...marketDataQuery,
      queryResults: resMarketData as MarketDataQueryResult[]
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