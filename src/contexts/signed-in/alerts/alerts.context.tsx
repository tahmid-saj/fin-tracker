import { Alert, AlertsContextType, AlertsProviderProps } from "./alerts.types";
import { FC, useState, createContext } from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";
import { saveAlertSetting, sendSESVerification,
  sendSNSSubscriptionVerification, sendSNSUnsubscription } from "../../../utils/api-requests/alerts.requests";

// helper functions
const createAlertHelper = async (alerts: Alert[] | undefined, alert: Alert, 
  userId: string | null | undefined, email: string | null | undefined): Promise<Alert[] | undefined> => {

  // save alert setting
  saveAlertSetting(alert, userId, email)
  
  // send SNS / SES email verification
  sendSNSSubscriptionVerification(userId, email)
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
  userId: string | null | undefined, email: string | null | undefined): Promise<Alert[] | undefined> => {

  if (!alerts) {
    return alerts
  }
  
  // unsubscribe from SNS topic
  sendSNSUnsubscription(userId, email)

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
  
  createAlert: (alert: Alert) => {},
  deleteAlert: (alert: Alert) => {}
})

// context component
export const AlertsProvider: FC<AlertsProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[] | undefined>(undefined)

  const currentUser = useSelector(selectCurrentUser)

  const createAlert = async (alert: Alert) => {
    if (currentUser) {
      const res = await createAlertHelper(alerts, alert, currentUser?.uid, currentUser?.email)
      setAlerts(res)
    }
  }

  const deleteAlert = async (alert: Alert) => {
    if (currentUser) {
      const res = await deleteAlertHelper(alerts, alert, currentUser?.uid, currentUser?.email)
      setAlerts(res)
    }
  }

  return (
    <AlertsContext.Provider value={{ alerts, createAlert, deleteAlert }}>
      { children }
    </AlertsContext.Provider>
  )
}