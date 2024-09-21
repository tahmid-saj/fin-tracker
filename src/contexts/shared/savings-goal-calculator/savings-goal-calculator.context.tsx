import React, { createContext, useState, useEffect, ReactNode, FC } from "react";
import { validateSavingsGoalInput } from "../../../utils/validations/savings.validation.js"
import { calculateSavingsGoal, calculateSavingsGoalSchedule } from "../../../utils/calculations/savings.calculations.js";

import { SavingsGoalResult, SavingsGoalScheduleResult, SavingsGoalInput, SavingsGoalCalculatorProviderProps, SavingsGoalCalculatorContextType } from "./savings-goal-calculator.types.js"

// helper functions
const calculateSavingsGoalHelper = (savingsGoalResult: SavingsGoalResult | undefined, savingsGoalInput: SavingsGoalInput): SavingsGoalResult | undefined => {
  if (validateSavingsGoalInput(savingsGoalInput)) {
    
    return savingsGoalResult
  }

  return calculateSavingsGoal({
    savingsGoal: Number(savingsGoalInput.savingsGoal),
    yearsToReachGoal: Number(savingsGoalInput.yearsToReachGoal),
    interestRatePerYear: Number(savingsGoalInput.interestRatePerYear),
    compounded: String(savingsGoalInput.compounded),
    amountFirstDeposit: Number(savingsGoalInput.amountFirstDeposit),
    dateFirstDeposit: String(savingsGoalInput.dateFirstDeposit)
  })
}

const calculateSavingsGoalScheduleHelper = (savingsGoalResult: SavingsGoalResult): SavingsGoalScheduleResult[] | undefined => {
  return calculateSavingsGoalSchedule(savingsGoalResult)
}

// initial state
export const SavingsGoalCalculatorContext = createContext<SavingsGoalCalculatorContextType>({
  savingsGoalResult: undefined,
  // savingsGoalResult structure
  // {
  //   savingsGoal: "",
  //   yearsToReachGoal: "",
  //   interestRatePerYear: "",
  //   compounded: SAVINGS_GOAL_COMPOUNDED.daily,
  //   amountFirstDeposit: "",
  //   dateFirstDeposit: ""
  //   monthlyDepositRequired: ,
  //   dailyDepositRequired: ,
  //   weeklyDepositRequired: 
  // }

  savingsGoalScheduleResult: undefined,
  // savingsGoalScheduleResult structure
  // [
  //   {
  //     currentDate: "2022-06",
  //     monthlyDeposit: 233,
  //     interestEarned: 2,
  //     totalInterestEarned: 4,
  //     balance: 237
  //   }
  // ]

  calculateSavingsGoal: () => {},
  calculateSavingsGoalSchedule: () => {}
})

// savings goal calculator provider
export const SavingsGoalCalculatorProvider: FC<SavingsGoalCalculatorProviderProps> = ({ children }) => {
  const [savingsGoalResult, setSavingsGoalResult] = useState<SavingsGoalResult | undefined>(undefined)
  const [savingsGoalScheduleResult, setSavingsGoalScheduleResult] = useState<SavingsGoalScheduleResult[] | undefined>(undefined)

  useEffect(() => {
    if (savingsGoalResult !== undefined) {
      calculateSavingsGoalSchedule(savingsGoalResult)
    }
  }, [savingsGoalResult])

  const calculateSavingsGoal = (savingsGoalInput: SavingsGoalInput) => {
    setSavingsGoalResult(calculateSavingsGoalHelper(savingsGoalResult, savingsGoalInput))
  }

  const calculateSavingsGoalSchedule = (savingsGoalResult: SavingsGoalResult) => {
    setSavingsGoalScheduleResult(calculateSavingsGoalScheduleHelper(savingsGoalResult))
  }

  const value = { savingsGoalResult, savingsGoalScheduleResult,
    calculateSavingsGoal, calculateSavingsGoalSchedule }

  return (
    <SavingsGoalCalculatorContext.Provider value={ value }>
      { children }
    </SavingsGoalCalculatorContext.Provider>
  )
}