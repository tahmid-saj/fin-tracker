
// define the structure for query results

import { Fragment } from "react";
import { useWebSocket } from "../../../../contexts/shared/live-prices/live-prices.context";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type
import SimplePaper from "../../mui/paper/paper.component";
import ReactApexChart from "react-apexcharts";
import { MarketDataGraphContainer } from "./live-prices-graph.styles";

interface QueryResult {
  time: string | number,
  closing: number
}

// define paper styles
const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
};

const LivePricesGraph = () => {
  const { livePrices, initialPricesQuery } = useWebSocket()

  if (!livePrices || !livePrices.queryResults) {
    return <Fragment></Fragment>
  }

  const { queryResults } = livePrices

  // create arrays to hold time and amounts
  const queryResultsTimes: string[] = []
  const queryResultsAmounts: number[] = queryResults.map((queryResult: QueryResult) => {
    queryResultsTimes.push(new Date(queryResult.time).toLocaleDateString())
    return queryResult.closing
  })

  // Define the data series for the chart
  const series = [
    {
      name: initialPricesQuery?.marketDataTicker,
      data: queryResultsAmounts,
    },
  ]

  // Define the options for the ApexChart, typed with ApexOptions
  const options: ApexOptions = {
    chart: {
      type: "area",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: `${initialPricesQuery?.marketDataTicker} (${initialPricesQuery?.marketDataStartDate} - ${initialPricesQuery?.marketDataEndDate}, ${initialPricesQuery?.marketDataInterval} interval)`,
      align: "left",
    },
    labels: queryResultsTimes,
    xaxis: {
      type: "category", // Correct the type to 'category' for string labels
      labels: {
        show: false,
      },
    },
    yaxis: {
      opposite: false,
    },
    legend: {
      horizontalAlign: "right",
    },
  };

  // Render the chart within a styled paper container
  return (
    <SimplePaper styles={paperStyles}>
      <MarketDataGraphContainer>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={COMMON_SPACING.lineChart.height}
          width={COMMON_SPACING.lineChart.width}
        />
      </MarketDataGraphContainer>
    </SimplePaper>
  );
}

export default LivePricesGraph