import { errorOnGetStocksMarketData, errorOnGetIndicesMarketData, 
  errorOnGetCryptoMarketData, errorOnGetForexMarketData } from "../errors/market-data.errors";
import { restClient } from "@polygon.io/client-js";
import { convertUnixMsecToDatetime } from "../helpers/helpers.utils";

import { DEFAULT_MARKET_DATA, MARKET_DATA_SEARCH_QUERY_MULTIPLIER,
  MARKET_DATA_CRYPTO_PREFIX, MARKET_DATA_FOREX_PREFIX
} from "../constants/market-data.constants";

// market data api requests

const polygonRestClient = restClient(process.env.REACT_APP_POLYGON_API_KEY)

// helper functions
function processMarketDataResponse(marketDataRes) {
  return marketDataRes.results.map((marketDataRecord) => {
    return {
      closing: marketDataRecord.c,
      time: convertUnixMsecToDatetime(marketDataRecord.t)
    }
  })
}

// stocks
export async function getStocksMarketData(marketDataQuery) {
  console.log(marketDataQuery)

  const resMarketData = await polygonRestClient.stocks.aggregates(
    marketDataQuery.marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER, 
    marketDataQuery.marketDataInterval.toLowerCase(),
    String(marketDataQuery.marketDataStartDate),
    String(marketDataQuery.marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetStocksMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return resMarketData
}

// indices
export async function getIndicesMarketData(marketDataQuery) {
  const resMarketData = await polygonRestClient.indices.aggregates(
    marketDataQuery.marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER, 
    marketDataQuery.marketDataInterval.toLowerCase(),
    String(marketDataQuery.marketDataStartDate),
    String(marketDataQuery.marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetIndicesMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return resMarketData
}

// crypto
export async function getCryptoMarketData(marketDataQuery) {
  const resMarketData = await polygonRestClient.crypto.aggregates(
    MARKET_DATA_CRYPTO_PREFIX + marketDataQuery.marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER,
    marketDataQuery.marketDataInterval.toLowerCase(),
    String(marketDataQuery.marketDataStartDate),
    String(marketDataQuery.marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetCryptoMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return resMarketData
}

// forex
export async function getForexMarketData(marketDataQuery) {
  const resMarketData = await polygonRestClient.forex.aggregates(
    MARKET_DATA_FOREX_PREFIX + marketDataQuery.marketDataTicker, 
    MARKET_DATA_SEARCH_QUERY_MULTIPLIER,
    marketDataQuery.marketDataInterval.toLowerCase(),
    String(marketDataQuery.marketDataStartDate),
    String(marketDataQuery.marketDataEndDate)
    ).then(res => processMarketDataResponse(res))
    .catch((error) => {
      errorOnGetForexMarketData()
      console.log(error)
      return DEFAULT_MARKET_DATA
    })
  
  return resMarketData
}