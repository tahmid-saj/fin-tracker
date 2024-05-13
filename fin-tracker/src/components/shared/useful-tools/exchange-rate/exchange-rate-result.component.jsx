import "./exchange-rate-result.styles.scss"
import { useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"

const ExchangeRateResult = () => {
  const { exchangeRateResult } = useContext(UsefulToolsContext)

  return (
    <div className="exchange-rate-result-container">
      <p>{`Exchange rate from ${exchangeRateResult.fromCurrency} to ${exchangeRateResult.toCurrency}: ${exchangeRateResult.exchangeRate}`}</p>
    </div>
  )
}

export default ExchangeRateResult