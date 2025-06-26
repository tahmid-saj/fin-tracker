import { v4 as uuid } from "uuid"
import { MarketDataQuery } from "../../contexts/shared/market-data/market-data.types";
import { errorOnGetStocksMarketData, errorOnGetIndicesMarketData, 
  errorOnGetCryptoMarketData, errorOnGetForexMarketData, 
  errorOnGetMarketData} from "../errors/market-data.errors";
import { MARKET_DATA_REQUEST_POLL_INTERVAL, MARKET_DATA_REQUEST_TIMEOUT } from "../constants/market-data.constants";

// stocks
export async function getStocksMarketData(marketDataQuery: MarketDataQuery): Promise<any> {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_STOCKS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(marketDataQuery)
    })
    const resMarketData = await response.json()
    
    return resMarketData.queryResults
  } catch (error) {
    
    errorOnGetStocksMarketData()
  }
}

// indices
export async function getIndicesMarketData(marketDataQuery: MarketDataQuery): Promise<any> {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_INDICES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(marketDataQuery)
    })
    const resMarketData = await response.json()
    
    return resMarketData.queryResults
  } catch (error) {
    
    errorOnGetIndicesMarketData()
  }
}

// crypto
export async function getCryptoMarketData(marketDataQuery: MarketDataQuery): Promise<any> {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_CRYPTO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(marketDataQuery)
    })
    const resMarketData = await response.json()
    
    return resMarketData.queryResults
  } catch (error) {
    
    errorOnGetCryptoMarketData()
  }
}

// forex
export async function getForexMarketData(marketDataQuery: MarketDataQuery): Promise<any> {
  try {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_FOREX}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(marketDataQuery)
    })
    const resMarketData = await response.json()
    
    return resMarketData.queryResults
  } catch (error) {
    
    errorOnGetForexMarketData()
  }
}

// async processing of market data request
export async function getMarketDataAsync(marketDataQuery: MarketDataQuery): Promise<any> {
  try {
    const query = `type=${marketDataQuery.marketDataType}|ticker=${marketDataQuery.marketDataTicker}|interval=${marketDataQuery.marketDataInterval}|start=${marketDataQuery.marketDataStartDate}|end=${marketDataQuery.marketDataEndDate}`
    
    await fetch(`${process.env.REACT_APP_API_URL_MARKET_DATA_ASYNC_PROCESSING}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dedupID: uuid(),
        messageGroupId: uuid(),
        query: query
      })
    })

  } catch (error) {
    errorOnGetMarketData()
  }

  // poll every MARKET_DATA_REQUEST_POLL_INTERVAL
  // if queryResults is not received after MARKET_DATA_REQUEST_TIMEOUT, then clear the interval
  // if queryResults is received after MARKET_DATA_REQUEST_TIMEOUT, then clear the interval and timeout
  return new Promise((resolve, reject) => {
    let timeoutID: NodeJS.Timeout
    let intervalID: NodeJS.Timeout

    const poll = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_ASYNC_POLLING}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(marketDataQuery)
        })

        const resMarketData = await res.json()

        if (resMarketData.queryResults) {
          clearInterval(intervalID)
          clearTimeout(timeoutID)
          console.log(resMarketData)
          resolve(resMarketData.queryResults)
        }
      } catch (error) {
        errorOnGetMarketData()
      }
    }

    // start polling at the interval
    intervalID = setInterval(poll, MARKET_DATA_REQUEST_POLL_INTERVAL)

    // set up the timeout
    timeoutID = setTimeout(() => {
      clearInterval(intervalID)
      reject(new Error(`Polling timed out after ${MARKET_DATA_REQUEST_TIMEOUT} ms`))
    }, MARKET_DATA_REQUEST_TIMEOUT)

    poll()
  })
}