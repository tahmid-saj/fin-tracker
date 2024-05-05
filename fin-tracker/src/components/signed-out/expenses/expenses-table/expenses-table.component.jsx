import "./expenses-table.styles.scss"
import { useState, useContext } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import DeleteExpense from "../delete-expense/delete-expense.component";
import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context";

const ExpensesTable = () => {
  const { expenses } = useContext(ExpensesContext)
  const rowData = expenses.map((expense) => {
    return {
      Date: expense.expenseDate,
      Category: expense.expenseCategory,
      For: expense.expenseFor,
      Cost: expense.expenseCost
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState([
    { field: "Date"},
    { field: "Category" },
    { field: "For" },
    { field: "Cost" },
    { field: "Remove", cellRenderer: DeleteExpense }
]);

  return (
    // wrapping container with theme & size
    <div className="ag-theme-quartz-dark expenses-table-container" // applying the grid theme
      style={{ height: 400, width: '100%' }} // the grid will fill the size of the parent container
      >
      <AgGridReact rowData={ rowData } columnDefs={columnDefs}/>
    </div>
  )
}

export default ExpensesTable