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