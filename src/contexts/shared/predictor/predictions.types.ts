import { ReactNode } from "react";

// predictions types

export interface PredictionsContextType {
  predictionTickers: string[];
  predictionsData: PredictionData[];
  displayedPredictionData: PredictionData | undefined;

  displayPredictionData: (predictionTicker: string) => void;
}

export interface PredictionsProviderProps {
  children: ReactNode;
}

export type PredictionData = {
  predictionTicker: string;
  dailyPrediction: DailyPrediction;
  twoWeekPredictions: TwoWeekPrediction;
}

export type DailyPrediction = {
  predictionDate: string | Date;
  predictionPrice: number;
}

export type TwoWeekPrediction = {
  predictionDates: string[] | Date[];
  predictionPrices: number[];
}