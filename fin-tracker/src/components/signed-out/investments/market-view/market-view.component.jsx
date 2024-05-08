import "./market-view.styles.scss"
import InvestmentStocksGraph from "./stocks/stocks.component"
import InvestmentIndicesGraph from "./indices/indices.component"
import InvestmentCryptoGraph from "./crypto/crypto.component"
import InvestmentForexGraph from "./currencies/currencies.component"
import MarketDataSearch from "./market-data-search/market-data-search.component"

const MarketView = () => {
  return (
    <div className="market-view-container">
      <MarketDataSearch></MarketDataSearch>
    </div>
  )
}

export default MarketView