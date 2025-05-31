import { ReactNode } from "react";

// alerts types

export interface AlertsContextType {
  alerts: Alert[] | undefined,
  
  createAlert: (alert: Alert, email: string) => void,
  deleteAlert: (alert: Alert, email: string) => void
}

export interface AlertsProviderProps {
  children: ReactNode
}

export type Alert = {
  ticker: string,
  direction: string,
  threshold: number
}