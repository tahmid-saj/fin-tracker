import { ReactNode } from "react"

export type WebSocketContextType = {
  initialPricesQuery: InitialPricesQuery | undefined
  livePricesQuery: LivePricesQuery | undefined
  livePrices: LivePrices | undefined

  getInitialPrices: (data: InitialPricesQuery) => void,
  getLivePrices: (query?: any) => void
}

export interface LivePricesProviderProps {
  children: ReactNode
}

export type InitialPricesQuery = {
  marketDataType: string,
  marketDataTicker: string,
  marketDataInterval: string,
  marketDataStartDate: string,
  marketDataEndDate: string
}

export type LivePricesQuery = {
  marketDataType: string,
  marketDataTicker: string,
  marketDataInterval: string,
}

export type LivePricesQueryResult = {
  closing: number,
  time: string
}

export type LivePrices = {
  queryResults: LivePricesQueryResult[]
}