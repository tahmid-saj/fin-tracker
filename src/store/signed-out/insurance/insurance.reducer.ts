import { AnyAction } from "redux";
import { FilterConditions, INSURANCE_ACTION_TYPES, Insurance, InsurancePayment, InsurancesSummary } from "./insurance.types";
import { addInsurance, clearInsuranceFilter, filterInsurances, removeInsurance, 
  selectScheduledInsurancePayments, setInsurancePayments, setInsurancePaymentsView, 
  setInsurancesSummary, setInsurancesView, setScheduledInsurancePaymentsView 
} from "./insurance.action";

export type InsuranceState = {
  readonly insurances: Insurance[] | null | undefined;
  readonly insurancePayments: InsurancePayment[] | null | undefined;
  readonly filterConditions: FilterConditions | null | undefined;
  readonly selectedInsurancePaymentsDate: string | null | undefined;
  readonly scheduledInsurancePaymentsView: InsurancePayment[] | null | undefined;
  readonly insurancesView: Insurance[] | null | undefined;
  readonly insurancePaymentsView: InsurancePayment[] | null | undefined;
  readonly insurancesSummary: InsurancesSummary | null | undefined;
}

export const INSURANCE_INITIAL_STATE: InsuranceState = {
  insurances: [],
  insurancePayments: [],
  filterConditions: null,
  selectedInsurancePaymentsDate: null,
  scheduledInsurancePaymentsView: null,
  insurancesView: [],
  insurancePaymentsView: [],
  insurancesSummary: {}
}

export const insuranceReducer = (state=INSURANCE_INITIAL_STATE, action: AnyAction): InsuranceState => {
  if (addInsurance.match(action) || removeInsurance.match(action)) {
    return {
      ...state,
      insurances: action.payload
    }
  }

  if (setInsurancePayments.match(action)) {
    return {
      ...state,
      insurancePayments: action.payload
    }
  }

  if (filterInsurances.match(action) || clearInsuranceFilter.match(action)) {
    return {
      ...state,
      filterConditions: action.payload
    }
  }

  if (selectScheduledInsurancePayments.match(action)) {
    return {
      ...state,
      selectedInsurancePaymentsDate: action.payload
    }
  }

  if (setScheduledInsurancePaymentsView.match(action)) {
    return {
      ...state,
      scheduledInsurancePaymentsView: action.payload
    }
  }

  if (setInsurancesView.match(action)) {
    return {
      ...state,
      insurancesView: action.payload
    }
  }

  if (setInsurancePaymentsView.match(action)) {
    return {
      ...state,
      insurancePaymentsView: action.payload
    }
  }

  if (setInsurancesSummary.match(action)) {
    return {
      ...state,
      insurancesSummary: action.payload
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case INSURANCE_ACTION_TYPES.SET_INSURANCES:
  //     return {
  //       ...state,
  //       insurances: payload
  //     }
  //   case INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS:
  //   return {
  //     ...state,
  //     insurancePayments: payload
  //   }
  //   case INSURANCE_ACTION_TYPES.SET_FILTER_CONDITIONS:
  //     return {
  //       ...state,
  //       filterConditions: payload
  //     }
  //   case INSURANCE_ACTION_TYPES.SET_SELECTED_INSURANCE_PAYMENTS_DATE:
  //     return {
  //       ...state,
  //       selectedInsurancePaymentsDate: payload
  //     }
  //   case INSURANCE_ACTION_TYPES.SET_SCHEDULED_INSURANCE_PAYMENTS_VIEW:
  //     return {
  //       ...state,
  //       scheduledInsurancePaymentsView: payload
  //     }
  //   case INSURANCE_ACTION_TYPES.SET_INSURANCES_VIEW:
  //     return {
  //       ...state,
  //       insurancesView: payload
  //     }
  //   case INSURANCE_ACTION_TYPES.SET_INSURANCE_PAYMENTS_VIEW:
  //     return {
  //       ...state,
  //       insurancePaymentsView: payload
  //   }
  //   case INSURANCE_ACTION_TYPES.SET_INSURANCES_SUMMARY:
  //     return {
  //       ...state,
  //       insurancesSummary: payload
  //     }
  //   default:
  //     return state
  // }
}