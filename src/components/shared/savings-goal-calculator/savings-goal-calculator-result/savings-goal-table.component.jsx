import "./savings-goal-table.styles.jsx"
import { SavingsGoalTableGrid } from "./savings-goal-table.styles.jsx";

import { useState, useContext, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

// import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context";
import { useSelector } from "react-redux";
import { selectSavingsGoalScheduleResult } from "../../../../store/shared/savings-goal-calculator/savings-goal-calculator.selector.js";

import { Typography } from "@mui/material";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  display: "block",
  justifyContent: "center"
}

const SavingsGoalTable = () => {
  // const { savingsGoalScheduleResult } = useContext(SavingsGoalCalculatorContext)
  const savingsGoalScheduleResult = useSelector(selectSavingsGoalScheduleResult)

  const rowData = savingsGoalScheduleResult.map((savingsGoalMonth) => {
    return {
      Date: savingsGoalMonth.currentDate,
      MonthlyDeposit: savingsGoalMonth.monthlyDeposit.toFixed(2),
      InterestEarned: savingsGoalMonth.interestEarned.toFixed(2),
      TotalInterestEarned: savingsGoalMonth.totalInterestEarned.toFixed(2),
      Balance: savingsGoalMonth.balance.toFixed(2)
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState([
    { field: "Date"},
    { field: "MonthlyDeposit" },
    { field: "InterestEarned" },
    { field: "TotalInterestEarned" },
    { field: "Balance" }
  ])

  return (
    <SavingsGoalTableGrid>
    <SimplePaper styles={ paperStyles }>
        <Typography variant="subtitle1" sx={{ color: "black" }}>Savings Goal Summary</Typography>
          <div className="ag-theme-quartz-dark"
          style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
          <AgGridReact rowData={ rowData } columnDefs={ columnDefs } rowSelection={ "multiple" }/>
        </div>
    </SimplePaper>
      </SavingsGoalTableGrid>
  )
}

export default SavingsGoalTable