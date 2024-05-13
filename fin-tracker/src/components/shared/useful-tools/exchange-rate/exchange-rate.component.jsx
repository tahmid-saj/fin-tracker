import "./exchange-rate.styles.scss"
import { useState, useContext, Fragment } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import ExchangeRateResult from "./exchange-rate-result.component"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"

const defaultFormFields = {
  fromCurrency: "",
  toCurrency: ""
}

const ExchangeRate = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { exchangeRateResult, findExchangeRate } = useContext(UsefulToolsContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await findExchangeRate(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="exchange-rate-container">
      <form onSubmit={ handleSubmit }>
        <h3>Find exchange rate</h3>
        <FormInput label="From (currency)" type="text" required onChange={ handleChange }
                      name="fromCurrency" value={ formFields.fromCurrency }/>
        <FormInput label="To (currency)" type="text" required onChange={ handleChange }
            name="toCurrency" value={ formFields.toCurrency }/>
        
        <div className="buttons-container">
          <Button type="submit">Find</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </form>

      {
        exchangeRateResult &&
        <ExchangeRateResult></ExchangeRateResult>
      }
    </div>
  )
}

export default ExchangeRate