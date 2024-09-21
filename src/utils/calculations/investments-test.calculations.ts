type CompoundFrequency = "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "semiannually" | "annually";
type ContributionFrequency = "monthly" | "yearly";
type ContributionTiming = "beginning" | "end";

interface InvestmentHistory {
  month: number;
  contribution: number;
  interestAccumulated: number;
  balance: number;
}

interface InvestmentResult {
  history: InvestmentHistory[];
  totalContribution: number;
  totalInterest: number;
  endBalance: number;
}

function calculateInvestment(
  principal: number,
  years: number,
  apy: number,
  compoundFrequency: CompoundFrequency,
  contribution: number,
  contributionFrequency: ContributionFrequency,
  contributionTiming: ContributionTiming
): InvestmentResult {
  const compoundPeriods: Record<CompoundFrequency, number> = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1,
  };
  
  const contributionPeriods: Record<ContributionFrequency, number> = {
    monthly: 12,
    yearly: 1,
  };

  const n = compoundPeriods[compoundFrequency];
  const cFreq = contributionPeriods[contributionFrequency];
  const r = apy / n;
  const totalMonths = years * 12;
  let futureValue = principal;
  let totalInterest = 0;
  let compoundingMonths: number | undefined;
  
  switch (compoundFrequency) {
    case "annually":
      compoundingMonths = 12;
      break;
    case "semiannually":
      compoundingMonths = 6;
      break;
    case "quarterly":
      compoundingMonths = 3;
      break;
    case "monthly":
      compoundingMonths = 1;
      break;
    case "biweekly":
      compoundingMonths = 14 / 30.437;
      break;
    case "weekly":
      compoundingMonths = 7 / 30.437;
      break;
    case "daily":
      compoundingMonths = 1 / 30.437;
      break;
    default:
      break;
  }

  const monthlyRate = (1 + r) ** (1 / compoundingMonths!) - 1;
  let totalContribution = 0;
  let history: InvestmentHistory[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interestAccumulated = futureValue * monthlyRate;
    totalInterest += interestAccumulated;
    let additionalContribution = 0.0;
    futureValue += interestAccumulated;

    if (cFreq === 1) {
      if (contributionTiming === "beginning" && month % 12 === 1) {
        futureValue += contribution;
        additionalContribution = contribution;
        totalContribution += contribution;
      } else if (contributionTiming === "end" && month % 12 === 0) {
        futureValue += contribution;
        additionalContribution = contribution;
        totalContribution += contribution;
      }
    } else if (cFreq === 12) {
      futureValue += contribution;
      additionalContribution = contribution;
      totalContribution += contribution;
    }

    history.push({
      month: month,
      contribution: additionalContribution,
      interestAccumulated: interestAccumulated,
      balance: futureValue,
    });
  }

  return {
    history,
    totalContribution,
    totalInterest,
    endBalance: futureValue,
  };
}

// Example usage
const principal = 395324.54;
const years = 8;
const apy = 0.069;
const compoundFrequency: CompoundFrequency = "semiannually";
const contribution = 1999;
const contributionFrequency: ContributionFrequency = "monthly";
const contributionTiming: ContributionTiming = "beginning";

const result = calculateInvestment(
  principal,
  years,
  apy,
  compoundFrequency,
  contribution,
  contributionFrequency,
  contributionTiming
);

console.log(result);
