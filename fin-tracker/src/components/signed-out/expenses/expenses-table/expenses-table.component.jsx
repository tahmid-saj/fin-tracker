import "./expenses-table.styles.scss"
import { useState } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import DeleteExpense from "../delete-expense/delete-expense.component";

const ExpensesTable = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { Date: "T", Category: "dd", For: "Y", Cost: 64950 },
  ]);

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