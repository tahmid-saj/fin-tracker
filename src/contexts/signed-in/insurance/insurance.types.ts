import { ReactNode } from "react";

// insurance types

export interface InsuranceContextType {
  insurances: Insurance[];
  insurancePayments: InsurancePayment[];
  filterConditions: FilterConditions | {} | null;
  selectedInsurancePaymentsDate: string | null;
  insurancesView: Insurance[];
  insurancePaymentsView: InsurancePayment[];
  scheduledInsurancePaymentsView: InsurancePayment[] | null;

  addInsurance: (insurance: Insurance) => void;
  filterInsurances: (filterConditions: FilterConditions) => void;
  removeInsurance: (insuranceFor: string) => void;
  selectScheduledInsurancePayments: (insuranceData: string) => void

  insurancesSummary: InsurancesSummary;

  setDefaultInsurancesValues: () => void;
  setDefaultInsurancesSummaryValues: () => void;
  updateInsurancesAndSummary: () => void;
}

export interface InsuranceProviderProps {
  children: ReactNode
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
  insuranceFor?: string;
  insuranceInterval?: string;
  insuranceStartDate?: string;
  insuranceEndDate?: string;
}

export type InsurancesSummary = {
  currentTotalInsurancePlanned?: number;
  currentAllInsurancesCategories?: Set<string>;
  pastMonthAllInsurancesPayment?: number;
  pastMonthInsurances?: InsurancePayment[];
}