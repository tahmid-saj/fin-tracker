import "./predictions.styles.tsx"

import InfoPaper from "../../../components/shared/mui/info-paper/info-paper.component.tsx"
import TabHeaders from "../../../components/shared/mui/tabs/tab-headers/tab-headers.component.tsx"
import TabContent from "../../../components/shared/mui/tabs/tab-content/tab-content.component.tsx"
import DailyPrediction from "../../../components/shared/predictor/daily-prediction/daily-prediction.component.tsx"
import TwoWeekPredictionsGraph from "../../../components/shared/predictor/two-week-predictions/two-week-predictions-graph/two-week-predictions-graph.component.tsx"
import TwoWeekPredictionsTable from "../../../components/shared/predictor/two-week-predictions/two-week-predictions-table/two-week-predictions-table.component.tsx"

import { PredictionsContainer } from "./predictions.styles"
import { useContext } from "react"
import { PredictionsContext } from "../../../contexts/shared/predictor/predictions.context.tsx"

const Predictions = () => {
  const { predictionTickers, displayedPredictionData, displayPredictionData } = useContext(PredictionsContext)

  const displayPredictionDataHandler = (predictionTicker: string) => {
    displayPredictionData(predictionTicker)
  }

  return (
    displayedPredictionData && displayedPredictionData !== undefined &&
    <PredictionsContainer>
      <InfoPaper>
        <TabHeaders tabHeaders={ predictionTickers } activeTabHeader={ displayedPredictionData.predictionTicker } 
          tabHeaderClickHandler={ displayPredictionDataHandler }></TabHeaders>
        
        <TabContent>
          <DailyPrediction/>
          <br/>
          <br/>
          <TwoWeekPredictionsGraph/>
          <br/>
          <TwoWeekPredictionsTable/>
        </TabContent>
      </InfoPaper>
    </PredictionsContainer>
  )
}

export default Predictions