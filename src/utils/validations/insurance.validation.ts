import { FilterConditions } from "../../contexts/signed-in/insurance/insurance.types"
import { Insurance } from "../../contexts/signed-in/insurance/insurance.types"
import { REGEX_PATTERNS } from "../constants/regex.constants"
import { errorOnInsuranceExists, errorOnInvalidInsuranceFor,
  errorOnInvalidInsurancePayment, errorOnStartDateBeforeEndDate
} from "../errors/insurance.errors"

// insurance validation functions

export const validateAddInsurance = (insurances: Insurance[], insurance: Insurance): boolean => {
  // validating if insuranceFor exists in insurances
  const insuranceExists = insurances.find((ins) => ins.insuranceFor === insurance.insuranceFor)

  if (insuranceExists) {
    errorOnInsuranceExists()
    return true
  }

  // validating if insuranceFor is valid
  if (insurance.insuranceFor && !(REGEX_PATTERNS.names.test(String(insurance.insuranceFor)))) {
    errorOnInvalidInsuranceFor()
    return true;
  }

  // validating if insurancePayment is valid
  if (!(REGEX_PATTERNS.floatNumbers.test(String(insurance.insurancePayment))) || Number(insurance.insurancePayment) < 0) {
    errorOnInvalidInsurancePayment()
    return true
  }

  return false
}

export const validateFilterInsurances = (filterConditions: FilterConditions): boolean => {
  // validating if expenseFor is valid
  if (filterConditions.insuranceFor && !(REGEX_PATTERNS.names.test(String(filterConditions.insuranceFor)))) {
    errorOnInvalidInsuranceFor()
    return true
  }

  // validating if startDate > endDate
  if (filterConditions.insuranceStartDate && filterConditions.insuranceEndDate && filterConditions.insuranceStartDate > filterConditions.insuranceEndDate) {
    errorOnStartDateBeforeEndDate()
    return true
  }

  return false
}

export const validateRemoveInsurance = (insuranceFor: string): boolean => {
  return false
}