import "./summary-table-savings-account.styles.scss"
import { useState, useContext, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";

const SummaryTableSavingsAccount = ({ financeItemInfo }) => {
  const { savingsAccounts, getSavingsAccountInfo } = useContext(SavingsContext)
  const savingsAccountInfo = getSavingsAccountInfo(financeItemInfo.savingsAccountName)
  const { savings } = savingsAccountInfo

  const rowData = savings.map((savingMonth) => {
    return {
      Date: savingMonth.currentDate,
      InterestEarned: savingMonth.interestEarned.toFixed(2),
      TotalInterestEarned: savingMonth.totalInterestEarned.toFixed(2),
      Balance: savingMonth.balance.toFixed(2)
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState([
    { field: "Date"},
    { field: "InterestEarned" },
    { field: "TotalInterestEarned" },
    { field: "Balance" }
  ])

  return (
    <div className="ag-theme-quartz-dark expenses-table-container summary-table-savings-container" // applying the grid theme
      style={{ height: 650, width: '100%' }} // the grid will fill the size of the parent container
      >
      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } rowSelection={ "multiple" }/>
    </div>
  )
}

export default SummaryTableSavingsAccount