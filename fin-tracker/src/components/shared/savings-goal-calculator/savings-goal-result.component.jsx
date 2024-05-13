import "./savings-goal-result.styles.scss"

const SavingsGoalResult = () => {
  return (
    <div className="savings-goal-result-container">
      <h4>{`Monthly deposit required: `}</h4>
      <p>{`Or  a day`}</p>
      <p>{`Or  a week`}</p>
    </div>
  )
}

export default SavingsGoalResult