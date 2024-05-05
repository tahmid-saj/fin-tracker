import "./expenses-table.styles.scss"
import { useState, useContext, useCallback, useRef } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import DeleteExpense from "../delete-expense/delete-expense.component";
import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context";
import Button from "../../../shared/button/button.component";

const ExpensesTable = () => {
  const gridRef = useRef();
  const { expenses, removeExpense } = useContext(ExpensesContext)
  const rowData = expenses.map((expense) => {
    return {
      Date: expense.expenseDate,
      Category: expense.expenseCategory,
      For: expense.expenseFor,
      Cost: expense.expenseCost,
      Tag: expense.expenseId
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState([
    { field: "Date"},
    { field: "Category" },
    { field: "For" },
    { field: "Cost" },
    { field: "Tag" }
  ])

  const onRemoveSelected = (event) => {
    event.preventDefault()
    const selectedData = gridRef.current.api.getSelectedRows();
    // TODO: better manage selectedData[0] without the 0 in index
    if (!selectedData[0] || selectedData[0] === null || !selectedData[0].Tag || selectedData[0] === undefined) {
      return
    }
    // const res = gridRef.current.api.applyTransaction({ remove: selectedData });
    // removeExpense(selectedData)
    console.log(selectedData[0])
    removeExpense(selectedData[0].Tag)
  }

  return (
    // wrapping container with theme & size
    <div className="ag-theme-quartz-dark expenses-table-container" // applying the grid theme
      style={{ height: 500, width: '100%' }} // the grid will fill the size of the parent container
      >
      <AgGridReact rowData={ rowData } columnDefs={ columnDefs } ref={ gridRef } rowSelection={ "single" }/>
      <Button onClick={ (e) => onRemoveSelected(e) }>Remove Selected</Button>
    </div>
  )
}

export default ExpensesTable