import "./currency-converter-result.styles.scss"
import { useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"

const CurrencyConverterResult = () => {
  const { currencyConverterResult } = useContext(UsefulToolsContext)

  return (
    <div className="currency-converter-result-container">
      <p>{`Converted amount: ${currencyConverterResult.toCurrencyAmount} ${currencyConverterResult.toCurrency}`}</p>
    </div>
  )
}

export default CurrencyConverterResult