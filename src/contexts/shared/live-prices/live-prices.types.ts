import { ReactNode } from "react"

export type WebSocketContextType = {
  sendMessage: (action: string, data?: any) => void,
  lastMessage: any
}

export interface LivePricesProviderProps {
  children: ReactNode
}