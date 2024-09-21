import { ReactNode } from "react";

// market data types

export interface MarketDataContextType {
  marketData: MarketData | undefined;
}

export interface MarketDataProviderProps {
  children: ReactNode
}

export type MarketDataQuery = {
  marketDataType: string,
  marketDataTicker: string,
  marketDatainterval: string,
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
  marketDatainterval: string,
  marketDataStartDate: string,
  marketDataEndDate: string,

  queryResults: MarketDataQueryResult[]
}