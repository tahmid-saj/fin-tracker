// alerts api requests

import { Alert } from "../../contexts/signed-in/alerts/alerts.types"
import { Alert as AlertUnauthenticated } from "../../contexts/signed-out/alerts/alerts.types"
import { errorOnDeleteAlertSetting, errorOnSaveAlertSetting, errorOnSendSESEmailVerification, 
  errorOnSendSNSSubscriptionVerification, errorOnSNSUnsubscription } from "../errors/alerts.errors"

// sending SNS subscription email verification
export const sendSNSSubscriptionVerification = async (userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_VERIFICATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSendSNSSubscriptionVerification()
  }
}

export const sendSNSSubscriptionVerificationUnauth = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_VERIFICATION_UNAUTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSendSNSSubscriptionVerification()
  }
}

// sending SES email verification
export const sendSESVerification = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SES_VERIFICATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSendSESEmailVerification()
  }
}

// unsubscribing from SNS topic
export const sendSNSUnsubscription = async (userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_UNSUBSCRIBE}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSNSUnsubscription()
  }
}

export const sendSNSUnsubscriptionUnauth = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_UNSUBSCRIBE_UNAUTH}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSNSUnsubscription()
  }
}

// saving alert setting
export const saveAlertSetting = async (alert: Alert, userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SAVE_ALERT_SETTING}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...alert,
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnSaveAlertSetting()
  }
}

export const saveAlertSettingUnauth = async (alert: AlertUnauthenticated): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SAVE_ALERT_SETTING_UNAUTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...alert
      })
    })

    return response.json()
  } catch (err) {
    errorOnSaveAlertSetting()
  }
}

// delete alert setting
export const deleteAlertSetting = async (alert: Alert, userId: string | null | undefined, 
  email: string | null | undefined): Promise<void> => {
  
    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_DELETE_ALERT_SETTING}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...alert,
        userID: userId,
        email: email
      })
    })

    return response.json()
  } catch (err) {
    errorOnDeleteAlertSetting()
  }
}

export const deleteAlertSettingUnauth = async (alert: AlertUnauthenticated): Promise<void> => {
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_DELETE_ALERT_SETTING_UNAUTH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...alert
      })
    })

    return response.json()
  } catch (err) {
    errorOnDeleteAlertSetting()
  }
}