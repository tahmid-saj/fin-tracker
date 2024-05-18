import "./currency-converter.styles.jsx"
import { CurrencyConverterContainer } from "./currency-converter.styles.jsx"

import { useState, useContext, Fragment } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import CurrencyConverterResult from "./currency-converter-result.component"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"
import { Typography } from "@mui/material"
import { ButtonsContainer } from "../../button/button.styles.jsx"

const defaultFormFields = {
  fromCurrency: "",
  fromCurrencyAmount: "",
  toCurrency: ""
}

const CurrencyConverter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { currencyConverterResult, convertCurrency } = useContext(UsefulToolsContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await convertCurrency(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <CurrencyConverterContainer>
      <form onSubmit={ handleSubmit }>
        <Typography sx={{ paddingBottom: "2%" }} variant="h6">Convert currency</Typography>
          
          <Typography paragraph>From</Typography>
          <FormInput label="Amount" type="text" required onChange={ handleChange }
                      name="fromCurrencyAmount" value={ formFields.fromCurrencyAmount }/>
          <FormInput label="From (currency)" type="text" required onChange={ handleChange }
                      name="fromCurrency" value={ formFields.fromCurrency }/>

          <Typography paragraph>To</Typography>
          <FormInput label="To (currency)" type="text" required onChange={ handleChange }
                      name="toCurrency" value={ formFields.toCurrency }/>

        <ButtonsContainer>
          <Button type="submit">Convert</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </ButtonsContainer>
      </form>

      {
        currencyConverterResult &&
        <CurrencyConverterResult></CurrencyConverterResult>
      }
    </CurrencyConverterContainer>
  )
}

export default CurrencyConverter