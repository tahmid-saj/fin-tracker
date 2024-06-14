import { INSURANCE_ACTION_TYPES } from "./insurance.types";

export const INSURANCE_INITIAL_STATE = {
  insurances: [],
  insurancePayments: [],
  filterConditions: null,
  insurancesView: [],
  insurancePaymentsView: [],
  insurancesSummary: {}
}

export const insuranceReducer = (state=INSURANCE_INITIAL_STATE, action={}) => {
  const { type, payload } = action

  switch(type) {
    case INSURANCE_ACTION_TYPES.SET_INSURANCES:
      return {
        ...state,
        insurances: payload
      }
    case INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS:
    return {
      ...state,
      insurancePayments: payload
    }
    case INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS:
      return {
        ...state,
        filterConditions: payload
      }
    case INSURANCE_ACTION_TYPES.SET_INSURANCES_VIEW:
      return {
        ...state,
        insurancesView: payload
      }
    case INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS_VIEW:
      return {
        ...state,
        insurancePaymentsView: payload
    }
    case INSURANCE_ACTION_TYPES.SET_INSURANCES_SUMMARY:
      return {
        ...state,
        insurancesSummary: payload
      }
    default:
      return state
  }
}