import "./exchange-rate.styles.jsx"
import { ExchangeRateContainer } from "./exchange-rate.styles.jsx"

import { useState, useContext, Fragment } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import ExchangeRateResult from "./exchange-rate-result.component"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"
import { Typography } from "@mui/material"
import { ButtonsContainer } from "../../button/button.styles.jsx"

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
    <ExchangeRateContainer>
      <form onSubmit={ handleSubmit }>
        <Typography sx={{ paddingBottom: "2%" }} variant="h6">Find the exchange rate</Typography>

        <FormInput label="From (currency)" type="text" required onChange={ handleChange }
                      name="fromCurrency" value={ formFields.fromCurrency }/>
        <FormInput label="To (currency)" type="text" required onChange={ handleChange }
            name="toCurrency" value={ formFields.toCurrency }/>
        
        <ButtonsContainer>
          <Button type="submit">Find</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </ButtonsContainer>
      </form>

      {
        exchangeRateResult &&
        <ExchangeRateResult></ExchangeRateResult>
      }
    </ExchangeRateContainer>
  )
}

export default ExchangeRate