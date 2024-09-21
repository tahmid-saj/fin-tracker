import { createContext, useState, useEffect } from "react";
import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../../utils/constants/insurance.constants";
import { validateAddInsurance, validateFilterInsurances, 
  validateRemoveInsurance 
} from "../../../utils/validations/insurance.validation";
import { ActionWithPayload, createAction, withMatcher } from "../../../utils/reducer/reducer.utils";
import { FilterConditions, Insurance, INSURANCE_ACTION_TYPES, InsurancePayment, InsurancesSummary } from "./insurance.types";

export type AddInsurance = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_INSURANCES, Insurance[]>
export type FilterInsurances = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, FilterConditions | null>
export type RemoveInsurance = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_INSURANCES, Insurance[]>
export type ClearInsuranceFilter = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, null>
export type SetInsurancesView = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_INSURANCES_VIEW, Insurance[]>
export type SetInsurancePayments = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS, InsurancePayment[]>
export type SetInsurancePaymentsView = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS_VIEW, InsurancePayment[]>
export type SetInsurancesSummary = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_INSURANCES_SUMMARY, InsurancesSummary>
export type SelectScheduledInsurancePayments = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_SELECTED_INSURANCE_PAYMENTS_DATE, string>
export type SetScheduledInsurancePaymentsView = ActionWithPayload<INSURANCE_ACTION_TYPES.SET_SCHEDULED_INSURANCE_PAYMENTS_VIEW, InsurancePayment[]>

// helper functions

const addInsuranceHelper = (insurances: Insurance[], insurance: Insurance): Insurance[] => {
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

const checkDateRangeFilterOverlap = (filterConditions: FilterConditions, insurance: Insurance): boolean => {
  if (filterConditions.insuranceStartDate === "" || ((filterConditions.insuranceStartDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceStartDate <= insurance.insuranceEndDate) 
      || (filterConditions.insuranceEndDate === "" && filterConditions.insuranceStartDate <= insurance.insuranceFirstPaymentDate))) {
    if (filterConditions.insuranceEndDate === "" || ((filterConditions.insuranceEndDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceEndDate <= insurance.insuranceEndDate)
      || (filterConditions.insuranceStartDate === "" && filterConditions.insuranceEndDate >= insurance.insuranceEndDate))) {
      return true
    }
  }

  return false
}

export const filterInsurancesHelper = (insurances: Insurance[], filterConditions: FilterConditions): Insurance[] => {
  let filteredInsurances: Insurance[] = []

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

export const filterInsurancePaymentsHelper = (insurancePayments: InsurancePayment[], filterConditions: FilterConditions): InsurancePayment[] => {
  let filteredInsurancePayments: InsurancePayment[] = []

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

const removeInsuranceHelper = (insurances: Insurance[], insuranceFor: string): Insurance[] => {
  if (validateRemoveInsurance(insuranceFor)) return insurances

  return insurances.filter(insurance => insurance.insuranceFor !== insuranceFor)
}

export const selectScheduledInsurancePaymentsHelper = (insurancePayments: InsurancePayment[], insuranceDate: string): InsurancePayment[] | null => {
  const filteredInsurancePayments = insurancePayments.filter((insurancePayment) => {
    return insurancePayment.insuranceDate === insuranceDate
  })

  if (!filteredInsurancePayments) return null

  return filteredInsurancePayments
}

// actions

export const addInsurance = withMatcher((insurances: Insurance[], insurance: Insurance): AddInsurance => {
  if (validateAddInsurance(insurances, insurance)) {
    return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES, insurances)
  } else {
    const newInsurances = addInsuranceHelper(insurances, insurance)
    return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES, newInsurances)
  }
})

export const filterInsurances = withMatcher((filterConditions: FilterConditions): FilterInsurances => {
  if (validateFilterInsurances(filterConditions)) {
    return createAction(INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
  } else {
    return createAction(INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, filterConditions)
  }
})

export const removeInsurance = withMatcher((insurances: Insurance[], insuranceFor: string): RemoveInsurance => {
  const newInsurances = removeInsuranceHelper(insurances, insuranceFor)
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES, newInsurances)
})

export const clearInsuranceFilter = withMatcher((): ClearInsuranceFilter => {
  return createAction(INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS, null)
})

export const setInsurancesView = withMatcher((insurancesView: Insurance[]): SetInsurancesView => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES_VIEW, insurancesView)
})

export const setInsurancePayments = withMatcher((insurancePayments: InsurancePayment[]): SetInsurancePayments => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS, insurancePayments)
})

export const setInsurancePaymentsView = withMatcher((insurancePaymentsView: InsurancePayment[]) => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS_VIEW, insurancePaymentsView)
})

export const setInsurancesSummary = withMatcher((insurancesSummary: InsurancesSummary): SetInsurancesSummary => {
  return createAction(INSURANCE_ACTION_TYPES.SET_INSURANCES_SUMMARY, insurancesSummary)
})

export const selectScheduledInsurancePayments = withMatcher((insuranceDate: string): SelectScheduledInsurancePayments => {
  return createAction(INSURANCE_ACTION_TYPES.SET_SELECTED_INSURANCE_PAYMENTS_DATE, insuranceDate)
})

export const setScheduledInsurancePaymentsView = withMatcher((scheduledInsurancePaymentsView: InsurancePayment[] | null):SetScheduledInsurancePaymentsView => {
  return createAction(INSURANCE_ACTION_TYPES.SET_SCHEDULED_INSURANCE_PAYMENTS_VIEW, scheduledInsurancePaymentsView)
})