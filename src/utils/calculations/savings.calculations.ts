import { SavingsGoalInput, SavingsGoalResult, SavingsGoalScheduleResult } from "../../contexts/shared/savings-goal-calculator/savings-goal-calculator.types";
import { SavingsAccount } from "../../contexts/signed-in/savings/savings.types";
import { SavingsAccountCalculated } from "../../contexts/signed-out/savings/savings.types";
import { SAVINGS_CONTRIBUTION_INTERVALS, SAVINGS_GOAL_COMPOUNDED,
  AVERAGE_DAYS_IN_MONTH
} from "../constants/savings.constants";
import date from 'date-and-time'

type CompoundedInterestInput = {
  A: number;
  P: number;
  r: number;
  t: number;
  n: number;
}

type SavingsAccountCalculationInput = {
  initialDeposit: number;
  startDate: string;
  monthlyContribution: number;
  contributionPeriod: number;
  contributionInterval: string;
  apy: number;
}

// helper functions
const calculateCompoundedInterestPMT = (compoundedInterestInput: CompoundedInterestInput): number => {
  let res = compoundedInterestInput.A
  res -= compoundedInterestInput.P * (Math.pow(1 + (compoundedInterestInput.r / compoundedInterestInput.n), compoundedInterestInput.n * compoundedInterestInput.t))
  res /= (Math.pow(1 + (compoundedInterestInput.r / compoundedInterestInput.n), compoundedInterestInput.n * compoundedInterestInput.t) - 1) / (compoundedInterestInput.r / compoundedInterestInput.n)
  
  return res
}

const calculateCompoundedInterestA = (compoundedInterestInput: CompoundedInterestInput, PMT: number): { interestEarned: number, balance: number } => {
  const interestEarned = compoundedInterestInput.P * Math.pow(compoundedInterestInput.r / compoundedInterestInput.n, compoundedInterestInput.n * compoundedInterestInput.t)
  const compoundedResult = compoundedInterestInput.P * Math.pow(1 + (compoundedInterestInput.r / compoundedInterestInput.n), compoundedInterestInput.n * compoundedInterestInput.t)
  const balance = compoundedResult + PMT

  return {
    interestEarned: interestEarned,
    balance: balance
  }
}

const calculatePMTCompoundedInterestA = (compoundedInterestInput: CompoundedInterestInput, PMT: number): number => {
  let res = compoundedInterestInput.P
  res *= Math.pow(1 + (compoundedInterestInput.r / compoundedInterestInput.n), compoundedInterestInput.n * compoundedInterestInput.t)
  res += PMT * ((Math.pow(1 + (compoundedInterestInput.r / compoundedInterestInput.n), compoundedInterestInput.n * compoundedInterestInput.t) - 1) / (compoundedInterestInput.r / compoundedInterestInput.n))

  return res
}

// savings calculations

export const calculateSavings = (savingsAccount: SavingsAccountCalculationInput): SavingsAccountCalculated => {
  // return calculated totalSavings, totalContribution, totalInterest

  let resSavings = []
  const startDate = new Date(savingsAccount.startDate)
  
  let compoundedInterestInput: CompoundedInterestInput = {
    A: 0,
    P: savingsAccount.initialDeposit,
    r: savingsAccount.apy / 100,
    t: 0,
    n: 12
  }

  let totalContributionCalculation = 0;
  let totalInterest = 0
  let durationMonths = 0
  
  if (String(savingsAccount.contributionInterval) === SAVINGS_CONTRIBUTION_INTERVALS.months) {
    compoundedInterestInput.t = savingsAccount.contributionPeriod / 12
    durationMonths = savingsAccount.contributionPeriod

    totalContributionCalculation = Number(savingsAccount.monthlyContribution) * Number(savingsAccount.contributionPeriod);
  } else if (String(savingsAccount.contributionInterval) === SAVINGS_CONTRIBUTION_INTERVALS.years) {
    compoundedInterestInput.t = savingsAccount.contributionPeriod
    durationMonths = savingsAccount.contributionPeriod * 12

    totalContributionCalculation = Number(savingsAccount.monthlyContribution) * Number(savingsAccount.contributionPeriod) * 12;
  }

  let totalSavings = calculatePMTCompoundedInterestA(compoundedInterestInput, savingsAccount.monthlyContribution)

  compoundedInterestInput.t = 1 / 12

  for (let monthIndex = 1; monthIndex <= durationMonths; monthIndex++) {
    const currentDate = date.addMonths(startDate, monthIndex)

    const compoundedInterestResult = calculateCompoundedInterestA(compoundedInterestInput, savingsAccount.monthlyContribution)

    

    totalInterest += compoundedInterestResult.interestEarned
    compoundedInterestInput.P = compoundedInterestResult.balance

    resSavings.push({
      currentDate: String(currentDate),
      interestEarned: compoundedInterestResult.interestEarned,
      totalInterestEarned: totalInterest,
      // balance: monthIndex === (savingsGoalResult.yearsToReachGoal) * 12 ? savingsGoalResult.savingsGoal : compoundedInterestResult.balance
      balance: compoundedInterestResult.balance
    })
  }

  return {
    totalSavings: totalSavings,
    totalContribution: totalContributionCalculation,
    totalInterest: totalInterest,

    savings: resSavings
  };
};


// savings goal
export const calculateSavingsGoal = (savingsGoalInput: SavingsGoalInput): SavingsGoalResult | undefined => {
  

  let compoundedInterestInput = {
    A: savingsGoalInput.savingsGoal,
    P: savingsGoalInput.amountFirstDeposit,
    r: savingsGoalInput.interestRatePerYear / 100,
    t: savingsGoalInput.yearsToReachGoal,
    n: 0
  }

  if (savingsGoalInput.compounded === SAVINGS_GOAL_COMPOUNDED.daily) {
    compoundedInterestInput.n = 365
    
    const dailyDeposit = calculateCompoundedInterestPMT(compoundedInterestInput)

    return {
      ...savingsGoalInput,
      monthlyDepositRequired: dailyDeposit * AVERAGE_DAYS_IN_MONTH,
      dailyDepositRequired: dailyDeposit,
      weeklyDepositRequired: dailyDeposit * 7
    }
  } else if (savingsGoalInput.compounded === SAVINGS_GOAL_COMPOUNDED.monthly) {
    compoundedInterestInput.n = 12
    
    const PMT = calculateCompoundedInterestPMT(compoundedInterestInput)

    return {
      ...savingsGoalInput,
      monthlyDepositRequired: PMT,
      dailyDepositRequired: PMT / AVERAGE_DAYS_IN_MONTH,
      weeklyDepositRequired: (PMT / AVERAGE_DAYS_IN_MONTH) * 7
    }
  }
}

export const calculateSavingsGoalSchedule = (savingsGoalResult: SavingsGoalResult): SavingsGoalScheduleResult[] => {
  let res = []
  let totalInterest = 0
  const startDate = new Date(savingsGoalResult.dateFirstDeposit)

  let compoundedInterestInput: CompoundedInterestInput = {
    A: 0,
    P: savingsGoalResult.amountFirstDeposit,
    r: savingsGoalResult.interestRatePerYear / 100,
    t: (1 / 12),
    n: 0
  }

  if (savingsGoalResult.compounded === SAVINGS_GOAL_COMPOUNDED.daily) {
    compoundedInterestInput.n = 365
  } else if (savingsGoalResult.compounded === SAVINGS_GOAL_COMPOUNDED.monthly) {
    compoundedInterestInput.n = 12
  }

  for (let monthIndex = 1; monthIndex <= (savingsGoalResult.yearsToReachGoal) * 12; monthIndex++) {
    const currentDate = date.addMonths(startDate, monthIndex)

    const compoundedInterestResult = calculateCompoundedInterestA(compoundedInterestInput, savingsGoalResult.monthlyDepositRequired)
    totalInterest += compoundedInterestResult.interestEarned
    compoundedInterestInput.P = compoundedInterestResult.balance

    res.push({
      currentDate: String(currentDate),
      monthlyDeposit: savingsGoalResult.monthlyDepositRequired,
      interestEarned: compoundedInterestResult.interestEarned,
      totalInterestEarned: totalInterest,
      // balance: monthIndex === (savingsGoalResult.yearsToReachGoal) * 12 ? savingsGoalResult.savingsGoal : compoundedInterestResult.balance
      balance: compoundedInterestResult.balance
    })
  }

  return res
}