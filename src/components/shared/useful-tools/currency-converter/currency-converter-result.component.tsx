import "./currency-converter-result.styles.jsx"
import { CurrencyConverterResultContainer } from "./currency-converter-result.styles.jsx"

import { useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context.js"
import { Typography } from "@mui/material"

const CurrencyConverterResult = () => {
  const { currencyConverterResult } = useContext(UsefulToolsContext)

  return (
    <CurrencyConverterResultContainer>
      <Typography paragraph>{`Converted amount: ${currencyConverterResult?.toCurrencyAmount} ${currencyConverterResult?.toCurrency}`}</Typography>
    </CurrencyConverterResultContainer>
  )
}

export default CurrencyConverterResult