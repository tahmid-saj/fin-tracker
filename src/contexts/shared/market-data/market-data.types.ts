import { ReactNode } from "react";

// market data types

export interface MarketDataContextType {
  marketData: MarketData | undefined;

  searchMarketData: (marketDataQuery: MarketDataQuery) => void;
}

export interface MarketDataProviderProps {
  children: ReactNode
}

export type MarketDataQuery = {
  marketDataType: string,
  marketDataTicker: string,
  marketDataInterval: string,
  marketDataStartDate: string,
  marketDataEndDate: string
}

export type MarketDataQueryResult = {
  closing: number,
  time: string
}

export type MarketData = {
  marketDataType: string,
  marketDataTicker: string,
  marketDataInterval: string,
  marketDataStartDate: string,
  marketDataEndDate: string,

  queryResults: MarketDataQueryResult[]
}