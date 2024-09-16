// insurance types
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