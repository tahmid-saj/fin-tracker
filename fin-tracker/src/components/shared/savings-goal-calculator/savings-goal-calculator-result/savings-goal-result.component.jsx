import "./savings-goal-result.styles.scss"
import { useContext } from "react"
import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context"

const SavingsGoalResult = () => {
  const { savingsGoalResult } = useContext(SavingsGoalCalculatorContext)
  console.log(savingsGoalResult)

  return (
    <div className="savings-goal-result-container">
      <h4>{`Monthly deposit required: $${savingsGoalResult.monthlyDepositRequired.toFixed(2)}`}</h4>
      <p>{`Or $${savingsGoalResult.dailyDepositRequired.toFixed(2)} a day`}</p>
      <p>{`Or $${savingsGoalResult.weeklyDepositRequired.toFixed(2)} a week`}</p>
    </div>
  )
}

export default SavingsGoalResult