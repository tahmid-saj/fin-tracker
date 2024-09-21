import { INVESTMENT_CONTRIBUTION_AT, INVESTMENT_CONTRIBUTION_INTERVALS, 
  INVESTMENT_COMPOUNDING_INFO
} from "../constants/investments.constants";
import date from 'date-and-time'

import { Investment } from "../../contexts/signed-out/investments/investments.types";

// python code for investment calculation:
// import pandas as pd

// # Given values
// P = 200000  # initial principal
// C = 800     # annual contribution
// r_annual = 0.06  # annual interest rate
// n = 2       # compounding periods per year
// t = 2       # number of years

// # Convert annual interest rate to semiannual interest rate
// r_semiannual = r_annual / n

// # Convert semiannual interest rate to approximate monthly interest rate
// r_monthly = (1 + r_semiannual) ** (1/6) - 1

// # Total number of months
// total_months = t * 12

// # Initialize variables
// balance = P
// schedule = []

// # Calculate the monthly schedule
// for month in range(1, total_months + 1):
//     # Calculate interest for the current month
//     interest = balance * r_monthly
    
//     # Check if it's the end of the year to add the annual contribution
//     if month % 12 == 0:
//         balance += C
//         contribution = C
//     else:
//         contribution = 0
    
//     # Calculate ending balance
//     ending_balance = balance + interest
    
//     # Append the data for the current month to the schedule
//     schedule.append({
//         "Month": month,
//         "Contribution": contribution,
//         "Interest Accumulated": interest,
//         "Ending Balance": ending_balance
//     })
    
//     # Update balance for the next month
//     balance = ending_balance

// # Convert the schedule to a DataFrame for better readability
// schedule_df = pd.DataFrame(schedule)
// schedule_df


// investment calculations

const calculateSchedule = (investment: Investment) => {
  // calculate schedule
  
  let compoundedInterestInput = {
    P: Number(investment.startingAmount),
    n: INVESTMENT_COMPOUNDING_INFO[investment.compounded].compoundingPeriods,
    contributionFreq: investment.contributionInterval,
    r: (Number(investment.returnRate) / 100) / INVESTMENT_COMPOUNDING_INFO[investment.compounded].compoundingPeriods,
  }
  
  let totalMonths = Number(investment.afterYears) * 12
  let futureValue = Number(investment.startingAmount)
  let totalInterest = 0

  let compoundingMonths = INVESTMENT_COMPOUNDING_INFO[investment.compounded].compoundingPeriodInMonths
  
  let monthlyRate = (1 + compoundedInterestInput.r) ** (1 / compoundingMonths) - 1
  let totalContribution = 0.0
  let schedule = []
  
  const startDate = new Date(investment.startDate)

  for (let monthIndex = 1; monthIndex <= totalMonths; monthIndex++) {
    const currentDate = date.addMonths(startDate, monthIndex)

    let interestAccumulated = futureValue * monthlyRate
    totalInterest += interestAccumulated
    let currentContribution = 0.0
    futureValue += interestAccumulated

    if (compoundedInterestInput.contributionFreq === INVESTMENT_CONTRIBUTION_INTERVALS.year) {
      if (investment.contributionAt === INVESTMENT_CONTRIBUTION_AT.beginning && monthIndex % 12 === 1) {
        futureValue += Number(investment.additionalContribution)
        currentContribution = Number(investment.additionalContribution)
        totalContribution += Number(investment.additionalContribution)
      } else if (investment.contributionAt === INVESTMENT_CONTRIBUTION_AT.end && monthIndex % 12 === 0) {
        futureValue += Number(investment.additionalContribution)
        currentContribution = Number(investment.additionalContribution)
        totalContribution += Number(investment.additionalContribution)
      }
    } else if (compoundedInterestInput.contributionFreq === INVESTMENT_CONTRIBUTION_INTERVALS.month) {
      futureValue += Number(investment.additionalContribution)
      currentContribution = Number(investment.additionalContribution)
      totalContribution += Number(investment.additionalContribution)
    }

    schedule.push({
      currentDate: String(currentDate),
      contribution: currentContribution,
      interestAccumulated: interestAccumulated,
      endingBalance: futureValue
    })
  }

  

  return {
    schedule: schedule,
    endBalance: futureValue,
    totalContribution: totalContribution,
    totalInterest: totalInterest
  }
}

export const calculateInvestment = (investment: Investment) => {
  // return calculated endBalance, totalContribution, totalInterest, investments (monthly schedule table)
  const resCalculateSchedule = calculateSchedule(investment)

  return {
    endBalance: resCalculateSchedule.endBalance,
    totalContribution: resCalculateSchedule.totalContribution,
    totalInterest: resCalculateSchedule.totalInterest,

    investments: resCalculateSchedule.schedule
  };
};
