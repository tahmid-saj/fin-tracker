import "./insurance-table.styles.jsx"
import { InsuranceTableContainer } from "./insurance-table.styles.jsx";

import { useState, useContext, useCallback, useRef } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Button from "../../../shared/button/button.component";

import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context";

import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"],
}

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

      
      removeInsurance(selectedData[0].For)
    }
  
    const handleClearFilter = (event) => {
      event.preventDefault()
  
      clearInsuranceFilter()
    }

  return (
    <div className="container">
      <SimplePaper styles={ paperStyles }>
        <InsuranceTableContainer>
          <div className="ag-theme-quartz-dark"
            style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
            <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "multiple" }/>
          </div>
        </InsuranceTableContainer>

        <div className="row">
          <div className="col-12">
            <div className="btn-group flex-wrap">
              <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
              <Button type="button" onClick={ handleClearFilter }>Clear Filter</Button>
            </div>
          </div>
        </div>
      </SimplePaper>
    </div>
  )
}

export default InsuranceTable