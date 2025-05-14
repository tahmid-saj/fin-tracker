import "./exchange-rate-result.styles.tsx"
import { ExchangeRateResultContainer } from "./exchange-rate-result.styles.tsx"

import { useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context.ts"
import { Typography } from "@mui/material"

const ExchangeRateResult = () => {
  const { exchangeRateResult } = useContext(UsefulToolsContext)

  return (
    <ExchangeRateResultContainer>
      <Typography paragraph>{`Exchange rate from ${exchangeRateResult?.fromCurrency} to ${exchangeRateResult?.toCurrency}: ${exchangeRateResult?.exchangeRate}`}</Typography>
    </ExchangeRateResultContainer>
  )
}

export default ExchangeRateResult