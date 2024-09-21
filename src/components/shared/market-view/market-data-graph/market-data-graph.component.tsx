import "./market-data-graph.styles.jsx";
import { MarketDataGraphContainer } from "./market-data-graph.styles.jsx";

import ReactApexChart from "react-apexcharts";
import { useContext, Fragment } from "react";
import { MarketDataContext } from "../../../../contexts/shared/market-data/market-data.context";
import { MarketDataContextType } from "../../../../contexts/shared/market-data/market-data.types";
import { MARKET_DATA_INTERVALS } from "../../../../utils/constants/market-data.constants";
import { Divider } from "@mui/material";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants";
import SimplePaper from "../../mui/paper/paper.component";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

// Define the structure for query results
interface QueryResult {
  time: string | number;
  closing: number;
}

// Define paper styles
const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
};

const MarketDataGraph = () => {
  // Type the marketData context
  const { marketData } = useContext<MarketDataContextType>(MarketDataContext);

  if (!marketData || !marketData.queryResults) {
    return <Fragment></Fragment>;
  }

  const { queryResults } = marketData;

  // Create arrays to hold time and amounts
  const queryResultsTimes: string[] = [];
  const queryResultsAmounts: number[] = queryResults.map((queryResult: QueryResult) => {
    queryResultsTimes.push(new Date(queryResult.time).toLocaleDateString());
    return queryResult.closing;
  });

  // Define the data series for the chart
  const series = [
    {
      name: marketData.marketDataTicker,
      data: queryResultsAmounts,
    },
  ];

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
      text: `${marketData.marketDataTicker} (${marketData.marketDataStartDate} - ${marketData.marketDataEndDate}, ${marketData.marketDataInterval} interval)`,
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
};

export default MarketDataGraph;
