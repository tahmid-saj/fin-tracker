import "./currency-converter-result.styles.tsx"
import { CurrencyConverterResultContainer } from "./currency-converter-result.styles.tsx"

import { useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context.tsx"
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