import "./savings-goal-table.styles.scss"
import { useState, useContext, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context";

const SavingsGoalTable = () => {
  const { savingsGoalScheduleResult } = useContext(SavingsGoalCalculatorContext)

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
    <div className="ag-theme-quartz-dark expenses-table-container savings-goal-table-container" // applying the grid theme
      style={{ height: 650, width: '90%' }} // the grid will fill the size of the parent container
      >
      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } rowSelection={ "multiple" }/>
    </div>
  )
}

export default SavingsGoalTable