import "./market-data-graph.styles.jsx"
import { MarketDataGraphContainer } from "./market-data-graph.styles.jsx";

import ReactApexChart from 'react-apexcharts';
import { MarketDataContext } from "../../../../contexts/shared/market-data/market-data.context";
import { Fragment, useContext } from "react";

import { MARKET_DATA_INTERVALS } from "../../../../utils/constants/market-data.constants";
import { Divider } from "@mui/material";

const MarketDataGraph = () => {
  const { marketData } = useContext(MarketDataContext)
  if (!marketData || !marketData.queryResults) return (
    <Fragment></Fragment>
  )

  const { queryResults } = marketData
  console.log(marketData)
  
  // if (!queryResults) return (
  //   <Fragment></Fragment>
  // )

  const queryResultsTimes = []
  const queryResultsAmounts = queryResults.map((queryResult) => {
    queryResultsTimes.push(Date(queryResult.time))
    return queryResult.closing
  })

  const series = [{
    name: marketData.marketDataTicker,
    data: queryResultsAmounts
  }]

  const options = {
    chart: {
      type: 'area',
      height: 500,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    title: {
      text: `${marketData.marketDataTicker} (${marketData.marketDataStartDate} 
        - ${marketData.marketDataEndDate}, ${MARKET_DATA_INTERVALS[marketData.marketDataInterval]} interval)`,
      align: 'left'
    },
    labels: queryResultsTimes,
    xaxis: {
      type: 'string',
      labels: {
        show: false
      }
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'right'
    }
  };

  return (
    <MarketDataGraphContainer>
      <ReactApexChart options={ options } series={ series } type="area" height={ 500 } width={ "100%" }/>
    </MarketDataGraphContainer>
  )
}

export default MarketDataGraph