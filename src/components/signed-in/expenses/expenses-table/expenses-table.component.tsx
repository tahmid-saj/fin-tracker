import "./expenses-table.styles.tsx"
import { ExpensesTableContainer } from "./expenses-table.styles.tsx";
import { useState, useContext, useCallback, useRef, MouseEvent } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context.tsx";
import Button from "../../../shared/button/button.component.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";

import { AgGridReact as AgGridReactType } from "ag-grid-react"; // Needed for typing
import { ColDef } from "ag-grid-community";

type ExpenseData = {
  Date: string,
  Category: string,
  For: string,
  Cost: number,
  Tag: number
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"],
}

const ExpensesTable = () => {
  const gridRef = useRef<AgGridReactType<ExpenseData>>(null);
  const { expensesView, removeExpense, clearExpensesFilter } = useContext(ExpensesContext)
  const rowData = expensesView?.map((expense) => {
    return {
      Date: expense.expenseDate,
      Category: expense.expenseCategory,
      For: expense.expenseFor,
      Cost: expense.expenseCost,
      Tag: expense.expenseId
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const columnDefs: ColDef<ExpenseData>[] = [
    { field: "Date"},
    { field: "Category" },
    { field: "For" },
    { field: "Cost" },
    { field: "Tag" }
  ]

  const onRemoveSelected = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const selectedData = gridRef?.current?.api.getSelectedRows();
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData || !selectedData[0] || selectedData[0].Tag === undefined) {
      return;
    }

    // const res = gridRef.current.api.applyTransaction({ remove: selectedData });
    // removeExpense(selectedData)
    
    removeExpense(Number(selectedData[0].Tag))
  }

  const handleClearFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    clearExpensesFilter()
  }

  return (
    <div className="container">
      <SimplePaper styles={ paperStyles }>
        <ExpensesTableContainer>
          <div className="ag-theme-quartz-dark"
          style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
            <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "multiple" }/>
          </div>
        </ExpensesTableContainer>

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

export default ExpensesTable