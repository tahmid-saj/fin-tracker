// live-prices constants

export enum WS_ACTIONS {
  initialPrices = "getInitialPrices",
  livePrices = "getLivePrices"
}

export enum LIVE_PRICE_MESSAGE_TYPES {
  initialPrices = "INITIAL_PRICES",
  livePrices = "LIVE_PRICES"
}

export const LIVE_PRICES_POLL_INTERVAL = 1200000