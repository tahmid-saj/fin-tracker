import { createSelector } from "reselect";
import { InsuranceState } from "./insurance.reducer";
import { RootState } from "../../store";

const selectInsuranceReducer = (state: RootState): InsuranceState => state.insurance

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

export const selectSelectedInsurancePaymentsDate = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.selectedInsurancePaymentsDate
)

export const selectScheduledInsurancePaymentsView = createSelector(
  [selectInsuranceReducer],
  (insurance) => insurance.scheduledInsurancePaymentsView
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