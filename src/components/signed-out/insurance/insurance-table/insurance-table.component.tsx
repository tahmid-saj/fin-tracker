import "./insurance-table.styles.tsx"
import { InsuranceTableContainer } from "./insurance-table.styles.tsx";
import { useState, useContext, useCallback, useRef } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import Button from "../../../shared/button/button.component.tsx";

import { useDispatch, useSelector } from "react-redux";
import { selectInsurances, selectInsurancesView } from "../../../../store/signed-out/insurance/insurance.selector.ts";
import { removeInsurance, clearInsuranceFilter } from "../../../../store/signed-out/insurance/insurance.action.ts";
import { alertAddedToExpenses, alertRemovedFromExpenses } from "../../../../utils/alerts/insurance.alerts.ts";

import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { MouseEvent } from "react";

import { ColDef } from "ag-grid-community";
import { AgGridReact as AgGridReactType } from "ag-grid-react"; // Needed for typing


type InsuranceData = {
  For: string,
  PaymentPerPeriod: number,
  Interval: string,
  Start: string,
  End: string
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"],
}

const InsuranceTable = () => {
  const dispatch = useDispatch()
  const insurances = useSelector(selectInsurances)
  const insurancesView = useSelector(selectInsurancesView)

  const gridRef = useRef<AgGridReactType<InsuranceData>>(null);

  const rowData = insurancesView?.map((insurance) => {
    return {
      // AddToExpenses: "",
      For: insurance.insuranceFor,
      PaymentPerPeriod: insurance.insurancePayment,
      Interval: insurance.insuranceInterval,
      Start: insurance.insuranceFirstPaymentDate,
      End: insurance.insuranceEndDate
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const columnDefs: ColDef<InsuranceData>[] = [
    // { field: "AddToExpenses",
    //   showDisabledCheckboxes: true,
    //   checkboxSelection: true
    // },
    { field: "For"},
    { field: "PaymentPerPeriod"},
    { field: "Interval"},
    { field: "Start"},
    { field: "End"},
  ]

  const onRemoveSelected = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const selectedData = gridRef?.current?.api?.getSelectedRows();
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData || !selectedData[0] || selectedData[0].For === undefined) {
      return
    }

    
    dispatch(removeInsurance(insurances!, selectedData[0].For))
  }

  const handleClearFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    dispatch(clearInsuranceFilter())
  }

  // const onRowSelected = (event) => {
  //   if (event.source === "checkboxSelected") {
  //     if (event.node.isSelected()) {
  //       alertAddedToExpenses()
  //     } else {
  //       alertRemovedFromExpenses()
  //     }
  //   }
  // }

  // const onDataRendered = useCallback((params) => {
  //   const nodesToSelect = [];
  //   params.api.forEachNode((node) => {
  //     if (node.data && node.data.Interval === "Annually") {
  //       nodesToSelect.push(node);
  //     }
  //   });
  //   params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  // }, []);

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