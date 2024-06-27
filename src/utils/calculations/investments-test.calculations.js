function calculateInvestment(principal, years, apy, compoundFrequency, contribution, contributionFrequency, contributionTiming) {
  const compoundPeriods = {
      "daily": 365,
      "weekly": 52,
      "biweekly": 26,
      "monthly": 12,
      "quarterly": 4,
      "semiannually": 2,
      "annually": 1
  };
  
  const contributionPeriods = {
      "monthly": 12,
      "yearly": 1
  };
  
  const n = compoundPeriods[compoundFrequency];
  const cFreq = contributionPeriods[contributionFrequency];
  const r = apy / n;
  const totalMonths = years * 12;
  let futureValue = principal;
  let totalInterest = 0;
  // let monthlyRate = (1 + r) ** (1 / (n / 12)) - 1;

  let compoundingMonths

  switch(compoundFrequency) {
    case "annually":
      compoundingMonths = 12
      break
    case "semiannually":
      compoundingMonths = 6
      break
    case "quarterly":
      compoundingMonths = 3
      break
    case "monthly":
      compoundingMonths = 1
      break
    case "biweekly":
      compoundingMonths = 14 / 30.437
      break
    case "weekly":
      compoundingMonths = 7 / 30.437
      break
    case "daily":
      compoundingMonths = 1 / 30.437
      break
    default:
      break
  }

  let monthlyRate = (1 + r) ** (1 / compoundingMonths) - 1;
  let totalContribution = 0;
  let history = [];
  
  for (let month = 1; month <= totalMonths; month++) {
      let interestAccumulated = futureValue * monthlyRate;
      totalInterest += interestAccumulated;
      let additionalContribution = 0.0;
      futureValue += interestAccumulated;
      
      if (cFreq === 1) {
        if (
          // contributionTiming === "beginning" && (month % (12 / cFreq) === 1)
          contributionTiming === "beginning" && month % 12 === 1
        ) {
            futureValue += contribution;
            additionalContribution = contribution;
            totalContribution += contribution
        } else if (
          // contributionTiming === "end" && (month % (12 / cFreq) === 0)
          contributionTiming === "end" && month % 12 === 0
        ) {
            futureValue += contribution;
            additionalContribution = contribution;
            totalContribution += contribution
        }
      } else if (cFreq === 12) {
        futureValue += contribution;
        additionalContribution = contribution;
        totalContribution += contribution
      }
      
      history.push({
          month: month,
          contribution: additionalContribution,
          interestAccumulated: interestAccumulated,
          balance: futureValue
      });
  }
  
  return {
    history,
    totalContribution,
    totalInterest,
    endBalance: futureValue
  }
}

// Example usage
let principal = 395324.54;
let years = 8;
let apy = 0.069;
let compoundFrequency = "semiannually";
let contribution = 1999;
let contributionFrequency = "monthly";
let contributionTiming = "beginning";

let result = calculateInvestment(principal, years, apy, compoundFrequency, contribution, contributionFrequency, contributionTiming);

