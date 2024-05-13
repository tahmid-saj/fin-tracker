import { createContext, useState, useEffect } from "react";
import { validateSavingsGoalInput } from "../../../utils/validations/savings.validation";
import { calculateSavingsGoal, calculateSavingsGoalSchedule } from "../../../utils/calculations/savings.calculations";

// helper functions
const calculateSavingsGoalHelper = (savingsGoalResult, savingsGoalInput) => {
  if (validateSavingsGoalInput(savingsGoalInput)) {
    console.log("invalid savings goal input")
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

const calculateSavingsGoalScheduleHelper = (savingsGoalResult) => {
  return calculateSavingsGoalSchedule(savingsGoalResult)
}

// initial state
export const SavingsGoalCalculatorContext = createContext({
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
export const SavingsGoalCalculatorProvider = ({ children }) => {
  const [savingsGoalResult, setSavingsGoalResult] = useState(undefined)
  const [savingsGoalScheduleResult, setSavingsGoalScheduleResult] = useState(undefined)

  useEffect(() => {
    if (savingsGoalResult !== undefined) {
      calculateSavingsGoalSchedule(savingsGoalResult)
    }
  }, [savingsGoalResult])

  const calculateSavingsGoal = (savingsGoalInput) => {
    setSavingsGoalResult(calculateSavingsGoalHelper(savingsGoalResult, savingsGoalInput))
  }

  const calculateSavingsGoalSchedule = (savingsGoalResult) => {
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