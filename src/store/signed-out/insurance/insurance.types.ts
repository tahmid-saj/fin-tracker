export enum INSURANCE_ACTION_TYPES {
  SET_INSURANCES = "insurance/SET_INSURANCES",
  SET_INSURANCE_PAYMENTS = "insurance/SET_INSURANCE_PAYMENTS",
  SET_FILTER_CONDITIONS = "insurance/SET_FILTER_CONDITIONS",

  SET_SELECTED_INSURANCE_PAYMENTS_DATE = "insurance/SET_SELECTED_INSURANCE_PAYMENTS_DATE",
  SET_SCHEDULED_INSURANCE_PAYMENTS_VIEW = "insurance/SET_SCHEDULED_INSURANCE_PAYMENTS_VIEW",

  SET_INSURANCES_VIEW = "insurance/SET_INSURANCES_VIEW",
  SET_INSURANCE_PAYMENTS_VIEW = "insurance/SET_INSURANCE_PAYMENTS_VIEW",
  SET_INSURANCES_SUMMARY = "insurance/SET_INSURANCES_SUMMARY"
}

export type Insurance = {
  insuranceFor: string;
  insurancePayment: number;
  insuranceInterval: string;
  insuranceFirstPaymentDate: string;
  insuranceEndDate: string;
}

export type InsurancePayment = {
  insuranceFor: string;
  insurancePayment: number;
  insuranceInterval: string;
  insuranceDate: string;
}

export type FilterConditions = {
  insuranceFor: string;
  insuranceInterval: string;
  insuranceStartDate: string;
  insuranceEndDate: string;
}

export type InsurancesSummary = {
  currentTotalInsurancePlanned?: number;
  currentAllInsurancesCategories?: Set<string>;
  pastMonthAllInsurancesPayment?: number;
  pastMonthInsurances?: InsurancePayment[];
}