import { createContext, FC, useEffect, useState } from "react";
import { PredictionData, PredictionsContextType, PredictionsProviderProps } from "./predictions.types";
import { getDailyPrediction, getTwoWeekPredictions } from "../../../utils/api-requests/predictions.requests";
import { PREDICTION_TICKERS, PREDICTION_TICKERS_INPUT } from "../../../utils/constants/predictions.constants";

// helper functions

const displayPredictionDataHelper = async (predictionTicker: string): Promise<PredictionData | undefined> => {
  const resDailyPrediction = await getDailyPrediction(predictionTicker)
  const resTwoWeekPrediction = await getTwoWeekPredictions(predictionTicker)

  return {
    predictionTicker: predictionTicker,
    dailyPrediction: {
      predictionDate: resDailyPrediction.prediction_date,
      predictionPrice: resDailyPrediction.prediction_price
    },
    twoWeekPredictions: {
      predictionDates: resTwoWeekPrediction.prediction_dates,
      predictionPrices: resTwoWeekPrediction.prediction_prices
    }
  }
}

// initial state
export const PredictionsContext = createContext<PredictionsContextType>({
  predictionTickers: [],
  // predictionTickers contain all tickers available

  predictionsData: [],
  // predictionsData contains the full predictions for all tickers

  displayedPredictionData: undefined,
  // displayedPredictionData contains the displayed prediction

  displayPredictionData: () => {}
  // displays the prediction data (updates displayedPredictionData)
})

export const PredictionsProvider: FC<PredictionsProviderProps> = ({ children }) => {
  const [predictionTickers, setPredictionTickers] = useState<string[]>([])
  const [predictionsData, setPredictionsData] = useState<PredictionData[]>([])
  const [displayedPredictionData, setDisplayedPredictionData] = useState<PredictionData | undefined>(undefined)

  useEffect(() => {
    const getPredictionData = async () => {
      setPredictionTickers(PREDICTION_TICKERS)
      const updatedPredictionData = await displayPredictionDataHelper(PREDICTION_TICKERS_INPUT.BTC)
      setDisplayedPredictionData(updatedPredictionData)
    }

    getPredictionData()
  }, [])

  const displayPredictionData = async (predictionTicker: string): Promise<void> => {
    let predictionTickerInput: string = "";
    if (predictionTicker === PREDICTION_TICKERS[0]) {
      predictionTickerInput = PREDICTION_TICKERS_INPUT.BTC
    } else if (predictionTicker === PREDICTION_TICKERS[1]) {
      predictionTickerInput = PREDICTION_TICKERS_INPUT.SP500
    } else if (predictionTicker === PREDICTION_TICKERS[2]) {
      predictionTickerInput = PREDICTION_TICKERS_INPUT.META
    }

    const updatedPredictionData = await displayPredictionDataHelper(predictionTickerInput)
    setDisplayedPredictionData(updatedPredictionData)
  }

  const value = { predictionTickers, setPredictionTickers, predictionsData, setPredictionsData,
    displayedPredictionData, setDisplayedPredictionData, displayPredictionData
  }

  return (
    <PredictionsContext.Provider value={ value }>
      { children }
    </PredictionsContext.Provider>
  )
}