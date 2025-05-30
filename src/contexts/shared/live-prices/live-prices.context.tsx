import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LivePricesProviderProps, WebSocketContextType } from "./live-prices.types";

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const WebSocketProvider: React.FC<LivePricesProviderProps> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null)
  const [lastMessage, setLastMessage] = useState<any>(null)

  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_LIVE_PRICES_WS_URL!)

    ws.current.onopen = () => {
      console.log("Connected to websocket")
    }

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log("Received: ", data)
      setLastMessage(data)
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

  const sendMessage = (action: string, data: any = []) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ action, ...data }))
    } else {
      console.log("Websocket is not open")
    }
  }

  return (
    <WebSocketContext.Provider value={{ sendMessage, lastMessage }}>
      { children }
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider');
  return context;
};