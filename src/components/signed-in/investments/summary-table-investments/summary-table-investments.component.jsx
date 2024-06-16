import "./summary-table-investments.styles.scss"
import { useState, useContext, useRef } from "react"
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

const SummaryTableInvestments = ({ financeItemInfo }) => {
  const { getInvestmentInfo } = useContext(InvestmentsContext)

  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);
  const { investments: investmentsSchedule } = investmentInfo

  const rowData = investmentsSchedule.map((investmentMonth) => {
    return {
      Date: investmentMonth.currentDate,
      Interest: investmentMonth.interestAccumulated.toFixed(2),
      Contribution: investmentMonth.contribution.toFixed(2),
      Balance: investmentMonth.endingBalance.toFixed(2)
    }
  })

  const [columnDefs, setColumnDefs] = useState([
    { field: "Date" },
    { field: "Interest" },
    { field: "Contribution" },
    { field: "Balance" }
  ])

  return (
    <div className="ag-theme-quartz-dark expenses-table-container summary-table-investments-container" // applying the grid theme
      style={{ height: 650, width: '100%' }} // the grid will fill the size of the parent container
      >
      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } rowSelection={ "multiple" }/>
    </div>
  )
}

export default SummaryTableInvestments