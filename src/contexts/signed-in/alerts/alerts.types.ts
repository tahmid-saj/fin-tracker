import { ReactNode } from "react";

// alerts types

export interface AlertsContextType {
  alerts: Alert[] | undefined,
  
  createAlert: (alert: Alert) => void,
  deleteAlert: (alert: Alert) => void
}

export interface AlertsProviderProps {
  children: ReactNode
}

export type Alert = {
  ticker: string,
  direction: string,
  threshold: number
}