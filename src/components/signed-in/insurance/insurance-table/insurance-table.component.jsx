import "./insurance-table.styles.scss"

import { useState, useContext, useCallback, useRef } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Button from "../../../shared/button/button.component";

import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context";

const InsuranceTable = () => {
  const { insurancesView, removeInsurance, clearInsuranceFilter } = useContext(InsuranceContext)

  const gridRef = useRef();

  const rowData = insurancesView.map((insurance) => {
    return {
      For: insurance.insuranceFor,
      PaymentPerPeriod: insurance.insurancePayment,
      Interval: insurance.insuranceInterval,
      Start: insurance.insuranceFirstPaymentDate,
      End: insurance.insuranceEndDate
    }
  })

    // Column Definitions: Defines the columns to be displayed.
    const [columnDefs, setColumnDefs] = useState([
      { field: "For"},
      { field: "PaymentPerPeriod"},
      { field: "Interval"},
      { field: "Start"},
      { field: "End"},
    ])
  
    const onRemoveSelected = (event) => {
      event.preventDefault()
      const selectedData = gridRef.current.api.getSelectedRows();
      // TODO: better manage selectedData[0] without the 0 in index
      if (!selectedData[0] || selectedData[0] === null || !selectedData[0].For || selectedData[0] === undefined) {
        return
      }

      console.log(selectedData[0])
      removeInsurance(selectedData[0].For)
    }
  
    const handleClearFilter = (event) => {
      event.preventDefault()
  
      clearInsuranceFilter()
    }

  return (
    <div className="ag-theme-quartz-dark insurances-table" // applying the grid theme
      style={{ height: 500, width: '100%' }} // the grid will fill the size of the parent container
      >
      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "multiple" }/>
      <div className="remove-insurance-selected-button buttons-container">
        <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
        <Button type="button" onClick={ handleClearFilter }>Clear Filter</Button>
      </div>
    </div>
  )
}

export default InsuranceTable