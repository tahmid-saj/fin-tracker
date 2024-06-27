import { errorOnGetStocksMarketData, errorOnGetIndicesMarketData, 
  errorOnGetCryptoMarketData, errorOnGetForexMarketData } from "../errors/market-data.errors";

// stocks
export async function getStocksMarketData(marketDataQuery) {
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
export async function getIndicesMarketData(marketDataQuery) {
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
export async function getCryptoMarketData(marketDataQuery) {
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
export async function getForexMarketData(marketDataQuery) {
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