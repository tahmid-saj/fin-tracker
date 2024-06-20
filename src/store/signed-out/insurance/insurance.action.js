import { createContext, useState, useEffect } from "react";
import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../../utils/constants/insurance.constants";
import { validateAddInsurance, validateFilterInsurances, 
  validateRemoveInsurance 
} from "../../../utils/validations/insurance.validation";
import { createAction } from "../../../utils/reducer/reducer.utils";
import { INSURANCE_ACTION_TYPES } from "./insurance.types";

// helper functions

const addInsuranceHelper = (insurances, insurance) => {
  return [ ...insurances,
    {
      insuranceFor: String(insurance.insuranceFor),
      insurancePayment: Number(insurance.insurancePayment),
      insuranceInterval: String(insurance.insuranceInterval),
      insuranceFirstPaymentDate: String(insurance.insuranceFirstPaymentDate),
      insuranceEndDate: String(insurance.insuranceEndDate)
    }
  ]
}

const checkDateRangeFilterOverlap = (filterConditions, insurance) => {
  if (filterConditions.insuranceStartDate === "" || ((filterConditions.insuranceStartDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceStartDate <= insurance.insuranceEndDate) 
      || (filterConditions.insuranceEndDate === "" && filterConditions.insuranceStartDate <= insurance.insuranceFirstPaymentDate))) {
    if (filterConditions.insuranceEndDate === "" || ((filterConditions.insuranceEndDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceEndDate <= insurance.insuranceEndDate)
      || (filterConditions.insuranceStartDate === "" && filterConditions.insuranceEndDate >= insurance.insuranceEndDate))) {
      return true
    }
  }

  return false
}

export const filterInsurancesHelper = (insurances, filterConditions) => {
  let filteredInsurances = []

  insurances.map((insurance) => {
    if (filterConditions.insuranceFor === "" || (insurance.insuranceFor.toLowerCase().includes(filterConditions.insuranceFor.toLowerCase()))) {
      if (filterConditions.insuranceInterval === "" || (insurance.insuranceInterval.toLowerCase() === filterConditions.insuranceInterval.toLowerCase())) {
        if (checkDateRangeFilterOverlap(filterConditions, insurance)) {
          filteredInsurances.push(insurance)
        }
      }
    }
  })

  return filteredInsurances
}

export const filterInsurancePaymentsHelper = (insurancePayments, filterConditions) => {
  let filteredInsurancePayments = []

  insurancePayments.map((insurancePayment) => {
    if (filterConditions.insuranceFor === "" || (insurancePayment.insuranceFor.toLowerCase().includes(filterConditions.insuranceFor.toLowerCase()))) {
      if (filterConditions.insuranceInterval === "" || (insurancePayment.insuranceInterval.toLowerCase() === filterConditions.insuranceInterval.toLowerCase())) {
        if (filterConditions.insuranceStartDate === "" || (filterConditions.insuranceStartDate <= insurancePayment.insuranceDate)) {
          if (filterConditions.insuranceEndDate === "" || (filterConditions.insuranceEndDate >= insurancePayment.insuranceDate)) {
            filteredInsurancePayments.push(insurancePayment)
          }
        }
      }
    }
  })

  return filteredInsurancePayments
}

const removeInsuranceHelper = (insurances, insuranceFor) => {
  if (validateRemoveInsurance(insuranceFor)) return insurances

  return insurances.filter(insurance => insurance.insuranceFor !== insuranceFor)
}

export const selectScheduledInsurancePaymentsHelper = (insurancePayments, insuranceDate) => {
  const filteredInsurancePayments = insurancePayments.filter((insurancePayment) => {
    return insurancePayment.insuranceDate === insuranceDate
  })

  if (!filteredInsurancePayments) return null

  return filteredInsurancePayments
}

// actions

export const addInsurance = (insurances, insurance) => {
  if (validateAddInsurance(insurances, insurance)) {
    return
  } else {
    const newInsurances = addInsuranceHelper(insurances, insurance)
    return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES, newInsurances)
  }
}

export const filterInsurances = (filterConditions) => {
  if (validateFilterInsurances(filterConditions)) {
    return
  } else {
    return createAction(INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, filterConditions)
  }
}

export const removeInsurance = (insurances, insuranceFor) => {
  const newInsurances = removeInsuranceHelper(insurances, insuranceFor)
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES, newInsurances)
}

export const clearInsuranceFilter = () => {
  return createAction(INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
}

export const setInsurancesView = (insurancesView) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES_VIEW, insurancesView)
}

export const setInsurancePayments = (insurancePayments) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS, insurancePayments)
}

export const setInsurancePaymentsView = (insurancePaymentsView) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS_VIEW, insurancePaymentsView)
}

export const setInsurancesSummary = (insurancesSummary) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES_SUMMARY, insurancesSummary)
}

export const selectScheduledInsurancePayments = (insuranceDate) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_SELECTED_INSURANCE_PAYMENTS_DATE, insuranceDate)
}

export const setScheduledInsurancePaymentsView = (scheduledInsurancePaymentsView) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_SCHEDULED_INSURANCE_PAYMENTS_VIEW, scheduledInsurancePaymentsView)
}