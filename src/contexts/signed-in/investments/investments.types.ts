import { ReactNode } from "react";

// investment types

export type Investment = {
  investmentName: string;
  investmentType: string;
  startingAmount: number;
  startDate: string;
  afterYears: number;
  returnRate: number;
  compounded: string;
  additionalContribution: number;
  contributionAt: string;
  contributionInterval: string;

  endBalance: number;
  totalContribution: number;
  totalInterest: number;

  investments: InvestmentCalculationRecord[];
}

export interface InvestmentContextType {
  investments: Investment[];

  createInvestment: (investment: Investment) => void;
  updateInvestment: (originalInvestmentName: string, updatedInvestment: Investment) => void;
  closeInvestment: (closingInvestmentName: string) => void;
  getInvestmentInfo: (investmentName: string) => void;

  investmentsSummary: InvestmentsSummary;

  setDefaultInvestmentsValues: () => void;
  setDefaultInvestmentsSummaryValues: () => void;
  updateInvestmentsAndSummary: () => void;
}

export interface InvestmentProviderProps {
  children: ReactNode;
}

export type InvestmentCalculationRecord = {
  currentDate: string;
  contribution: number;
  interestAccumulated: number;
  endingBalance: number;
}

export type InvestmentsSummary = {
  currentAllInvestmentsBalance?: number;
  totalAllContribution?: number;
  totalAllInterest?: number;
}

export type InvestmentInfo = {
  originalInvestmentInfo: Investment;
  updatedInvestmentInfo: Investment;
}