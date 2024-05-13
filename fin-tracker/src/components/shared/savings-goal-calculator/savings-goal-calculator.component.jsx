import "./savings-goal-calculator.styles.scss"
import { Fragment, useState, useContext } from "react"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import SavingsGoalResult from "./savings-goal-result.component"

const defaultFormFields = {
  savingsGoal: "",
  yearsToReachGoal: "",
  interestRatePerYear: "",
  compounded: "Daily",
  amountFirstDeposit: "",
  dateFirstDeposit: ""
}

const SavingsGoalCalculator = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="savings-goal-calculator-container">
      <form onSubmit={ handleSubmit }>
        <h3>Calculate a savings goal</h3>
        <FormInput label="Savings goal" type="text" required onChange={ handleChange }
                    name="savingsGoal" value={ formFields.savingsGoal }/>
        <FormInput label="Years to reach goal" type="text" required onChange={ handleChange }
                    name="yearsToReachGoal" value={ formFields.yearsToReachGoal }/>
        <FormInput label="Interest rate per year" type="text" required onChange={ handleChange }
                    name="interestRatePerYear" value={ formFields.interestRatePerYear }/>

        <label className="compoundedDailyMonthlyDropdown" htmlFor="compounded">Compounded:</label>
        <select required className="dropButton" name="compounded" id="compounded" 
                onChange={ handleChange } value={ formFields.compounded }>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
        </select>

        <FormInput label="Amount of first deposit" type="text" required onChange={ handleChange }
                    name="amountFirstDeposit" value={ formFields.amountFirstDeposit }/>

        <p>Date of first deposit:</p>
        <FormInput type="date" onChange={ (e) => handleChange(e) } required
                    name="dateFirstDeposit" value={ formFields.dateFirstDeposit }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Calculate</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </form>

      <SavingsGoalResult></SavingsGoalResult>
    </div>
  )
}

export default SavingsGoalCalculator