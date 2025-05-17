import "./predictions.styles.tsx"

import InfoPaper from "../../components/shared/info-paper/info-paper.component"
import TabHeaders from "../../components/shared/tabs/tab-headers/tab-headers.component"
import TabContent from "../../components/shared/tabs/tab-content/tab-content.component"
import DailyPrediction from "../../components/predictor/daily-prediction/daily-prediction.component"
import TwoWeekPredictionsGraph from "../../components/predictor/two-week-predictions/two-week-predictions-graph/two-week-predictions-graph.component"
import TwoWeekPredictionsTable from "../../components/predictor/two-week-predictions/two-week-predictions-table/two-week-predictions-table.component"
import { PredictionsContainer } from "./predictions.styles"
import { useContext } from "react"
import { PredictionsContext } from "../../contexts/predictor/predictions.context"

const Predictions = () => {
  const { predictionTickers, displayedPredictionData, displayPredictionData } = useContext(PredictionsContext)

  const displayPredictionDataHandler = (predictionTicker) => {
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