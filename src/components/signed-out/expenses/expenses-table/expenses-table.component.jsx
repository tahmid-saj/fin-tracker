import "./expenses-table.styles.jsx"
import { ExpensesTableContainer } from "./expenses-table.styles.jsx";
import { useState, useContext, useCallback, useRef } from "react";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import DeleteExpense from "../delete-expense/delete-expense.component";
// import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context";
import Button from "../../../shared/button/button.component";

import { useDispatch, useSelector } from "react-redux";
import { selectExpenses, selectExpensesView } from "../../../../store/signed-out/expenses/expenses.selector";
import { removeExpense, clearExpensesFilter } from "../../../../store/signed-out/expenses/expenses.action";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"],
}

const ExpensesTable = () => {
  const dispatch = useDispatch()
  const expenses = useSelector(selectExpenses)
  const expensesView = useSelector(selectExpensesView)

  const gridRef = useRef();
  // const { expensesView, removeExpense, clearExpensesFilter } = useContext(ExpensesContext)
  const rowData = expensesView.map((expense) => {
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
    
    dispatch(removeExpense(expenses, selectedData[0].Tag))
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    dispatch(clearExpensesFilter())
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