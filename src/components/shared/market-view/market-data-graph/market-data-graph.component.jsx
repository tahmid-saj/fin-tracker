import "./market-data-graph.styles.jsx"
import { MarketDataGraphContainer } from "./market-data-graph.styles.jsx";

import ReactApexChart from 'react-apexcharts';
import { MarketDataContext } from "../../../../contexts/shared/market-data/market-data.context";
import { Fragment, useContext } from "react";

import { MARKET_DATA_INTERVALS } from "../../../../utils/constants/market-data.constants";
import { Divider } from "@mui/material";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
}

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
    <SimplePaper styles={ paperStyles }>
      <MarketDataGraphContainer>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </MarketDataGraphContainer>
    </SimplePaper>
  )
}

export default MarketDataGraph