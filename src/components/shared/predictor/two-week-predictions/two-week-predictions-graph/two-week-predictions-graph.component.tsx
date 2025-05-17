import "./two-week-predictions-graph.styles"

import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { Fragment, useContext } from "react"
import { PredictionsContextType } from "../../../../../contexts/shared/predictor/predictions.types"
import { PredictionsContext } from "../../../../../contexts/shared/predictor/predictions.context"
import { PREDICTION_COLOR_CODES, PREDICTION_COMMON_SPACING } from "../../../../../utils/constants/predictions.constants"

const TwoWeekPredictionsGraph = () => {
  const { displayedPredictionData } = useContext<PredictionsContextType>(PredictionsContext)

  if (!displayedPredictionData || !displayedPredictionData.twoWeekPredictions) {
    return (
      <Fragment/>
    )
  }

  // Define the data series for the chart
  const series = [
    {
      name: displayedPredictionData.predictionTicker,
      data: displayedPredictionData.twoWeekPredictions.predictionPrices
    },
  ];

  // Define the options for the ApexChart, typed with ApexOptions
  const options: ApexOptions = {
    chart: {
      type: "area",
      zoom: {
        enabled: true,
      },
      foreColor: PREDICTION_COLOR_CODES.text[0]
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: `${displayedPredictionData.predictionTicker} - 2 Week Predictions`,
      align: "left",
    },
    labels: displayedPredictionData.twoWeekPredictions.predictionDates as string[],
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

  return (
    <ReactApexChart
      options={ options }
      series={ series }
      type="area"
      height={ PREDICTION_COMMON_SPACING.lineChart.height }
      width={ PREDICTION_COMMON_SPACING.lineChart.width }>
    </ReactApexChart>
  )
}

export default TwoWeekPredictionsGraph