import { errorOnGetStocksMarketData, errorOnGetIndicesMarketData, 
  errorOnGetCryptoMarketData, errorOnGetForexMarketData } from "../errors/market-data.errors";

// stocks
export async function getStocksMarketData(marketDataQuery) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_STOCKS}`)
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
    console.log(error)
    errorOnGetStocksMarketData()
  }
}

// indices
export async function getIndicesMarketData(marketDataQuery) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_INDICES}`)
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
    console.log(error)
    errorOnGetIndicesMarketData()
  }
}

// crypto
export async function getCryptoMarketData(marketDataQuery) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_CRYPTO}`)
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
    console.log(error)
    errorOnGetCryptoMarketData()
  }
}

// forex
export async function getForexMarketData(marketDataQuery) {
  try {
    console.log(`${process.env.REACT_APP_API_URL_MARKET_DATA}${process.env.REACT_APP_API_URL_MARKET_DATA_FOREX}`)
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
    console.log(error)
    errorOnGetForexMarketData()
  }
}