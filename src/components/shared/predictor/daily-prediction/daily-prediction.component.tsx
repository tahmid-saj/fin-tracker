import { useContext } from "react"
import "./daily-prediction.styles"
import { DailyPredictionContainer, DailyPredictionHeader } from "./daily-prediction.styles"
import { PredictionsContextType } from "../../../../contexts/shared/predictor/predictions.types"
import { PredictionsContext } from "../../../../contexts/shared/predictor/predictions.context"

const DailyPrediction = () => {
  const { displayedPredictionData } = useContext<PredictionsContextType>(PredictionsContext)

  return (
    <DailyPredictionContainer>
      <DailyPredictionHeader>
        Prediction Date - { `${displayedPredictionData?.dailyPrediction.predictionDate}` }
      </DailyPredictionHeader>
      <DailyPredictionHeader>
        Prediction Price - { `${displayedPredictionData?.dailyPrediction.predictionPrice.toFixed(2)}` }
      </DailyPredictionHeader>
    </DailyPredictionContainer>
  )
}

export default DailyPrediction