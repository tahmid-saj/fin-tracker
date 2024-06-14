import { errorOnInvalidInsuranceFor,
  errorOnInvalidInsurancePayment, errorOnStartDateBeforeEndDate
} from "../errors/insurance.errors"

// insurance validation functions

export const validateAddInsurance = (insurance) => {
  // validating if insuranceFor is valid
  if (!(/^[A-Za-z]*$/.test(String(insurance.insuranceFor)))) {
    errorOnInvalidInsuranceFor()
    return true;
  }

  // validating if insurancePayment is valid
  if (!(/^[0-9]*$/.test(String(insurance.insurancePayment))) || Number(insurance.insurancePayment) < 0) {
    errorOnInvalidInsurancePayment()
    return true
  }

  return false
}

export const validateFilterInsurances = (filterConditions) => {
  // validating if expenseFor is valid
  if (!(/^[A-Za-z]*$/.test(String(filterConditions.insuranceFor)))) {
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

export const validateRemoveInsurance = (insuranceFor) => {
  return false
}