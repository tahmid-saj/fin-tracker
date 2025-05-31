// alerts api requests

import { errorOnSaveAlertSetting, errorOnSendSESEmailVerification, 
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
    errorOnSNSUnsubscription()
  }
}

export const sendSNSUnsubscriptionUnauth = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SNS_UNSUBSCRIBE_UNAUTH}`, {
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
    errorOnSNSUnsubscription()
  }
}

// saving alert setting
export const saveAlertSetting = async (userId: string | null | undefined, email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SAVE_ALERT_SETTING}`, {
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
    errorOnSaveAlertSetting()
  }
}

export const saveAlertSettingUnauth = async (email: string | null | undefined): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_ALERTS}${process.env.REACT_APP_API_URL_ALERTS_SAVE_ALERT_SETTING_UNAUTH}`, {
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
    errorOnSaveAlertSetting()
  }
}
