import "./market-view.styles.jsx"
import { MarketViewContainer } from "./market-view.styles.jsx"
import MarketDataSearch from "./market-data-search/market-data-search.component"
import MarketDataGraph from "./market-data-graph/market-data-graph.component"

import { Fragment, useContext, useEffect } from "react"
import { MarketDataContext } from "../../../contexts/shared/market-data/market-data.context"
import { DEFAULT_MARKET_DATA } from "../../../utils/constants/market-data.constants"
import { Divider } from "@mui/material"

const MarketView = () => {
  const { marketData } = useContext(MarketDataContext)

  return (
    <Fragment>
      <MarketViewContainer>
        <MarketDataSearch></MarketDataSearch>
      </MarketViewContainer>

      <Divider/>

      <MarketViewContainer>
        {
          marketData !== DEFAULT_MARKET_DATA && marketData.queryResults !== undefined && <MarketDataGraph></MarketDataGraph>
        }
      </MarketViewContainer>
    </Fragment>
  )
}

export default MarketView