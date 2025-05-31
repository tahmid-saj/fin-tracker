import { createContext, useContext, useEffect, useRef, useState } from "react";
import { InitialPricesQuery, LivePrices, LivePricesProviderProps, 
  LivePricesQuery, WebSocketContextType } from "./live-prices.types";
import { LIVE_PRICE_MESSAGE_TYPES, LIVE_PRICES_POLL_INTERVAL, WS_ACTIONS } from "../../../utils/constants/live-prices.constants"

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const WebSocketProvider: React.FC<LivePricesProviderProps> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null)
  const [initialPricesQuery, setInitialPricesQuery] = useState<InitialPricesQuery | undefined>(undefined)
  const [livePricesQuery, setLivePricesQuery] = useState<LivePricesQuery | undefined>(undefined)
  const [livePrices, setLivePrices] = useState<LivePrices | undefined>(undefined)

  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_LIVE_PRICES_WS_URL!)

    ws.current.onopen = () => {
      console.log("Connected to websocket")
    }

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        // console.log("Received: ", data)
  
        // handle message type
        if (data.messageType === LIVE_PRICE_MESSAGE_TYPES.initialPrices) {
          // console.log("Initial prices received: ", data.initialPrices)

          setLivePrices({
            queryResults: data.initialPrices.queryResults
          })

          // after receiving the initial prices, we'll poll to receive live prices:
          setInterval(async () => {
            getLivePrices(data.initialPricesQuery)
          }, LIVE_PRICES_POLL_INTERVAL)

        } else if (data.messageType === LIVE_PRICE_MESSAGE_TYPES.livePrices) {
          // console.log("Live prices received: ", data.livePrices)

          // append new live prices to livePrices:
          if (livePrices) {
            for (let i = 0; i < livePrices.queryResults.length; i++) {
              let priceTime = livePrices.queryResults[i].time

              for (let j = 0; j < data.livePrices.length; j++) {
                let livePriceTime = data.livePrices[j].time

                if (priceTime === livePriceTime) {
                  continue
                } else {
                  setLivePrices({
                    queryResults: [
                      ...livePrices.queryResults,
                      data.livePrices[i]
                    ]
                  })
                }
              }
            }
          }
        }
      } catch (err) {
        console.log("Failed to parse live prices: ", err)
      }
    }

    ws.current.onclose = () => {
      console.log("Websocket closed")
    }

    ws.current.onerror = (error) => {
      console.error("Websocket error: ", error)
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const getInitialPrices = (data: InitialPricesQuery) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const action = WS_ACTIONS.initialPrices

      ws.current.send(JSON.stringify({ 
        action,
        data: {
          ...data
        }
      }))

      // store the query locally for reuse
      setInitialPricesQuery(data);
    } else {
      console.log("Websocket is not open")
    }
  }

  const getLivePrices = (query?: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const data = query || initialPricesQuery;
      const action = WS_ACTIONS.livePrices;

      console.log("Retrieving live prices for: ", data);

      if (!data) return console.warn("No valid initialPricesQuery to use.");

      ws.current.send(JSON.stringify({ 
        action,  
        data: { ...data }
      }));
    } else {
      console.log("Websocket is not open");
    }
  };

  return (
    <WebSocketContext.Provider value={{ initialPricesQuery, livePricesQuery, livePrices, 
      getInitialPrices, getLivePrices }}>
      { children }
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider');
  return context;
};