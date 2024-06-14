import { createSelector } from "reselect";

const selectInsuranceReducer = state => state.insurance

export const selectInsurances = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.insurances
)

export const selectInsurancePayments = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.insurancePayments
)

export const selectFilterConditions = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.filterConditions
)

export const selectInsurancesView = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.insurancesView
)

export const selectInsurancePaymentsView = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.insurancePaymentsView
)

export const selectInsurancesSummary = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.insurancesSummary
)