import { useState, useContext, Fragment } from "react"
import "./mortgage-calculator.styles.scss"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import { DOWNPAYMENT_FLAG_OPTIONS } from "../../../../utils/constants/useful-tools.constants"
import MortgageCalculatorResult from "./mortgage-calculator-result.component"

const defaultFormFields = {
  downpaymentFlag: "",
  loanAmount: "",
  homeValue: "",
  downpayment: "",
  interestRate: "",
  durationYears: "",
  homthlyHoa: "",
  annualPropertyTax: "",
  annualHomeInsurance: ""
}

const MortgageCalculator = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="mortgage-calculator-container">
      <form onSubmit={ handleSubmit }>
        <h3>Mortgage calculator</h3>
        <label className="downpaymentFlagDropdown" htmlFor="downpaymentFlag">Is there a downpayment?</label>
        <select required className="dropButton" name="downpaymentFlag" id="downpaymentFlag" 
                onChange={ handleChange } value={ formFields.downpaymentFlag }>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {
          formFields.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.no ?
          (
            <FormInput label="Loan amount" type="text" required onChange={ handleChange }
                    name="loanAmount" value={ formFields.loanAmount }/>
          )
          : (
            <Fragment>
              <FormInput label="Home value" type="text" required onChange={ handleChange }
                      name="homeValue" value={ formFields.homeValue }/>
              <FormInput label="Downpayment" type="text" required onChange={ handleChange }
                name="downpayment" value={ formFields.downpayment }/>
            </Fragment>
          )
        }

        <FormInput label="Interest rate" type="text" required onChange={ handleChange }
                    name="interestRate" value={ formFields.interestRate }/>
        <FormInput label="Duration in years" type="text" required onChange={ handleChange }
                    name="durationYears" value={ formFields.durationYears }/>
        
        <p>Optional:</p>
        <FormInput label="Monthly homeowner association fees " type="text" onChange={ handleChange }
            name="homthlyHoa" value={ formFields.homthlyHoa }/>
        <FormInput label="Annual property tax" type="text" onChange={ handleChange }
            name="annualPropertyTax" value={ formFields.annualPropertyTax }/>
        <FormInput label="Annual home insurance" type="text" onChange={ handleChange }
            name="annualHomeInsurance" value={ formFields.annualHomeInsurance }/>

        <div className="buttons-container">
          <Button type="submit">Calculate</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </form>
      
      <MortgageCalculatorResult></MortgageCalculatorResult>
    </div>
  )
}

export default MortgageCalculator