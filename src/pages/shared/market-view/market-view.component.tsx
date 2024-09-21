import "./market-view.styles.jsx"
import { MarketViewContainer } from "./market-view.styles.jsx"
import MarketDataSearch from "../../../components/shared/market-view/market-data-search/market-data-search.component.jsx"
import MarketDataGraph from "../../../components/shared/market-view/market-data-graph/market-data-graph.component.jsx"

import { Fragment, useContext, useEffect } from "react"
import { MarketDataContext } from "../../../contexts/shared/market-data/market-data.context.js"
import { DEFAULT_MARKET_DATA } from "../../../utils/constants/market-data.constants.js"
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