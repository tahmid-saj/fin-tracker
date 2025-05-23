import "./market-view.styles.tsx"
import { MarketViewContainer } from "./market-view.styles.tsx"
import MarketDataSearch from "../../../components/shared/market-view/market-data-search/market-data-search.component.tsx"
import MarketDataGraph from "../../../components/shared/market-view/market-data-graph/market-data-graph.component.tsx"

import { Fragment, useContext, useEffect } from "react"
import { MarketDataContext } from "../../../contexts/shared/market-data/market-data.context.tsx"
import { DEFAULT_MARKET_DATA } from "../../../utils/constants/market-data.constants.ts"
import { Divider } from "@mui/material"

const MarketView = () => {
  const { marketData } = useContext(MarketDataContext)

  return (
    <MarketViewContainer>
      <MarketDataSearch></MarketDataSearch>

      <Divider/>

      {
        marketData !== DEFAULT_MARKET_DATA && marketData.queryResults !== undefined && <MarketDataGraph></MarketDataGraph>
      }
    </MarketViewContainer>
  )
}

export default MarketView