import { Alert, AlertsContextType, AlertsProviderProps } from "./alerts.types";
import { FC, useState, createContext } from "react";

import { saveAlertSettingUnauth, sendSESVerification, 
  sendSNSSubscriptionVerificationUnauth, sendSNSUnsubscriptionUnauth } from "../../../utils/api-requests/alerts.requests";

// helper functions
const createAlertHelper = async (alerts: Alert[] | undefined, alert: Alert, 
  email: string | null | undefined): Promise<Alert[] | undefined> => {

  // save alert setting
  saveAlertSettingUnauth(alert, email)
  
  // send SNS / SES email verification
  sendSNSSubscriptionVerificationUnauth(email)
  sendSESVerification(email)

  if (!alerts) {
    return [ alert ]  
  }

  return [
    ...alerts,
    alert
  ]
}

const deleteAlertHelper = async (alerts: Alert[] | undefined, alert: Alert, 
  email: string | null | undefined): Promise<Alert[] | undefined> => {

  if (!alerts) {
    return alerts
  }
  
  // unsubscribe from SNS topic
  sendSNSUnsubscriptionUnauth(email)

  const res = alerts?.filter(alertSetting => {
    return alertSetting.ticker !== alert.ticker && alertSetting.direction !== alert.direction 
      && alertSetting.threshold !== alert.threshold
  })

  if (res.length === 0) return undefined

  return res
}

// initial state
export const AlertsContext = createContext<AlertsContextType>({
  alerts: undefined,
  
  createAlert: (alert: Alert, email: string) => {},
  deleteAlert: (alert: Alert, email: string) => {}
})

// context component
export const AlertsProvider: FC<AlertsProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[] | undefined>(undefined)

  const createAlert = async (alert: Alert, email: string) => {
    const res = await createAlertHelper(alerts, alert, email)
    setAlerts(res)
  }

  const deleteAlert = async (alert: Alert, email: string) => {
    const res = await deleteAlertHelper(alerts, alert, email)
    setAlerts(res)
  }

  return (
    <AlertsContext.Provider value={{ alerts, createAlert, deleteAlert }}>
      { children }
    </AlertsContext.Provider>
  )
}