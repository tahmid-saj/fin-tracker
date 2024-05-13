import "./currency-converter.styles.scss"
import { useState, useContext, Fragment } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import CurrencyConverterResult from "./currency-converter-result.component"

const defaultFormFields = {
  fromCurrency: "",
  fromCurrencyAmount: "",
  toCurrency: "",
  toCurrencyAmount: ""
}

const CurrencyConverter = () => {
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
    <div className="currency-converter-container">
      <form onSubmit={ handleSubmit }>
        <h3>Currency converter</h3>
        <div className="currency-converter-from-currency-container">
          <p>From</p>
          <FormInput label="Amount" type="text" required onChange={ handleChange }
                      name="fromCurrencyAmount" value={ formFields.fromCurrencyAmount }/>
          <FormInput label="From (currency)" type="text" required onChange={ handleChange }
                      name="fromCurrency" value={ formFields.fromCurrency }/>
        </div>

        <div className="currency-converter-to-currency-container">
          <p>To</p>
          <FormInput label="Amount" type="text" required onChange={ handleChange }
                      name="toCurrencyAmount" value={ formFields.toCurrencyAmount }/>
          <FormInput label="To (currency)" type="text" required onChange={ handleChange }
                      name="toCurrency" value={ formFields.toCurrency }/>
        </div>

        <div className="buttons-container">
          <Button type="submit">Convert</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </form>

      <CurrencyConverterResult></CurrencyConverterResult>
    </div>
  )
}

export default CurrencyConverter