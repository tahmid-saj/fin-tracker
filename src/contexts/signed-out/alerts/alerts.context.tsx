import { Alert, AlertsContextType, AlertsProviderProps } from "./alerts.types";
import { FC, useState, createContext } from "react";

import { saveAlertSettingUnauth, deleteAlertSettingUnauth, sendSESVerification, 
  sendSNSSubscriptionVerificationUnauth, sendSNSUnsubscriptionUnauth } from "../../../utils/api-requests/alerts.requests";

// helper functions
const createAlertHelper = async (alerts: Alert[] | undefined, alert: Alert): Promise<Alert[] | undefined> => {

  // save alert setting
  saveAlertSettingUnauth(alert)
  
  // send SNS / SES email verification
  sendSNSSubscriptionVerificationUnauth(alert.email)
  sendSESVerification(alert.email)

  if (!alerts) {
    return [ alert ]  
  }

  return [
    ...alerts,
    alert
  ]
}

const deleteAlertHelper = async (alerts: Alert[] | undefined, alert: Alert): Promise<Alert[] | undefined> => {

  if (!alerts) {
    return alerts
  }
  
  // delete single alert setting
  deleteAlertSettingUnauth(alert)

  const res = alerts?.filter(alertSetting => {
    return alertSetting.ticker !== alert.ticker && alertSetting.direction !== alert.direction 
      && alertSetting.threshold !== alert.threshold && alertSetting.email !== alert.email
  })

  if (res.length === 0) return undefined

  return res
}

const deleteAllAlertsHelper = async (alerts: Alert[] | undefined): Promise<undefined> => {
  if (!alerts) {
    return alerts
  }

  // unsubscribe from SNS topic for all alerts' emails
  alerts.map((alert) => {
    sendSNSUnsubscriptionUnauth(alert.email)
  })

  return undefined
}

// initial state
export const AlertsContext = createContext<AlertsContextType>({
  alerts: undefined,
  
  createAlert: (alert: Alert) => {},
  deleteAlert: (alert: Alert) => {},
  deleteAllAlerts: () => {}
})

// context component
export const AlertsProvider: FC<AlertsProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[] | undefined>(undefined)

  const createAlert = async (alert: Alert) => {
    const res = await createAlertHelper(alerts, alert)
    setAlerts(res)
  }

  const deleteAlert = async (alert: Alert) => {
    const res = await deleteAlertHelper(alerts, alert)
    setAlerts(res)
  }

  const deleteAllAlerts = async () => {
    const res = await deleteAllAlertsHelper(alerts)
    setAlerts(res)
  }

  return (
    <AlertsContext.Provider value={{ alerts, createAlert, deleteAlert, deleteAllAlerts }}>
      { children }
    </AlertsContext.Provider>
  )
}