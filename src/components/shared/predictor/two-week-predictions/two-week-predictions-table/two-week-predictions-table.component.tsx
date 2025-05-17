import "./two-week-predictions-table.styles";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Fragment, useContext } from "react";
import { ColDef } from "ag-grid-community";
import { PredictionsContext } from "../../../../../contexts/shared/predictor/predictions.context";
import { PREDICTION_COMMON_SPACING } from "../../../../../utils/constants/predictions.constants";

// ✅ Fix: Allow PredictionDate to be string | Date
type PredictionData = {
  PredictionDate: string | Date;
  PredictionPrice: number;
};

const TwoWeekPredictionsTable = () => {
  const { displayedPredictionData } = useContext(PredictionsContext);

  if (!displayedPredictionData || !displayedPredictionData.twoWeekPredictions) {
    return <Fragment />;
  }

  const rowData: PredictionData[] = displayedPredictionData.twoWeekPredictions.predictionDates.map(
    (predictionDate, predictionIndex) => ({
      PredictionDate: predictionDate,
      PredictionPrice: Number(
        displayedPredictionData.twoWeekPredictions.predictionPrices[predictionIndex].toFixed(2)
      ),
    })
  );

  const columnDefs: ColDef<PredictionData>[] = [
    { field: "PredictionDate" },
    { field: "PredictionPrice" },
  ];

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{
        height: PREDICTION_COMMON_SPACING.table.height,
        width: PREDICTION_COMMON_SPACING.table.width,
      }}
    >
      <AgGridReact<PredictionData>
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
      />
    </div>
  );
};

export default TwoWeekPredictionsTable;
