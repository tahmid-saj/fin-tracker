import "./market-data-graph.styles.scss"

import ReactApexChart from 'react-apexcharts';
import { MarketDataContext } from "../../../../../contexts/shared/market-data/market-data.context";
import { Fragment, useContext } from "react";

const MarketDataGraph = () => {
  const { marketData } = useContext(MarketDataContext)
  if (!marketData) return (
    <Fragment></Fragment>
  )

  // const { queryResults } = marketData
  console.log(marketData)
  
  // if (!queryResults) return (
  //   <Fragment></Fragment>
  // )

  const queryResultsTimes = []
  const queryResultsAmounts = marketData.map((queryResult) => {
    queryResultsTimes.push(queryResult.time)
    return queryResult.closing
  })

  const series = [{
    name: marketData.marketDataTicker,
    data: queryResultsAmounts
  }]

  const options = {
    chart: {
      type: 'area',
      height: 350,
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
      text: 'Investment Value',
      align: 'left'
    },
    labels: queryResultsTimes,
    xaxis: {
      type: 'string',
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'right'
    }
  };

  return (
    <div className="market-data-graph-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 350 } width={ 1000 }/>
    </div>
  )
}

export default MarketDataGraph