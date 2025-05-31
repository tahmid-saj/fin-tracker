import LivePricesSearch from "../../../components/shared/live-prices/live-prices-search/live-prices-search.component"
import LivePricesGraph from "../../../components/shared/live-prices/live-prices-graph/live-prices-graph.component"

import { useWebSocket } from "../../../contexts/shared/live-prices/live-prices.context"
import { DEFAULT_MARKET_DATA } from "../../../utils/constants/market-data.constants"
import { MarketViewContainer } from "../market-view/market-view.styles"
import { Divider } from "@mui/material"

const LivePrices = () => {
  const { livePrices } = useWebSocket()

  return (
    <MarketViewContainer>
      <LivePricesSearch></LivePricesSearch>

      <Divider/>

      {
        livePrices !== DEFAULT_MARKET_DATA && livePrices.queryResults !== undefined
        && livePrices.queryResults.length !== 0 && <LivePricesGraph></LivePricesGraph>
      }
    </MarketViewContainer>
  )
}

export default LivePrices