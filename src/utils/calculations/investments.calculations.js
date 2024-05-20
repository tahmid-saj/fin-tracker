import { INVESTMENT_CONTRIBUTION_INTERVALS } from "../constants/investments.constants";

// investment calculations

export const calculateInvestmentSummary = (investment) => {
  // return calculated endBalance, totalContribution, totalInterest

  let totalContributionCalculation;

  if (String(investment.contributionInterval) === INVESTMENT_CONTRIBUTION_INTERVALS.month) {
    totalContributionCalculation = Number(investment.afterYears) * Number(investment.additionalContribution) * 12; 
  } else if (String(investment.contributionInterval) === INVESTMENT_CONTRIBUTION_INTERVALS.year) {
    totalContributionCalculation = Number(investment.afterYears) * Number(investment.additionalContribution); 
  }

  return {
    endBalance: Math.floor(Math.random() * (10000 + 1)),
    totalContribution: totalContributionCalculation,
    totalInterest: Math.floor(Math.random() * (1000 + 1)),
  };
};
