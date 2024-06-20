import AddExpense from "../../../components/signed-in/expenses/add-expense/add-expense.component"
import ExpensesFilter from "../../../components/signed-in/expenses/expenses-filter/expense-filter.component"
import ExpensesGraph from "../../../components/signed-in/expenses/expenses-graph/expenses-graph.component"
import ExpensesTable from "../../../components/signed-in/expenses/expenses-table/expenses-table.component"
import ExpensesSummary from "../../../components/signed-in/expenses/expenses-summary/expenses-summary.component"
import "./expenses.styles.scss"
import { useContext, Fragment } from "react"
import { ExpensesContext } from "../../../contexts/signed-in/expenses/expenses.context"
import ScheduleCalendar from "../../../components/signed-in/expenses/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-in/expenses/schedule/schedule-day-info/schedule-day-info.component"
import { Divider } from "@mui/material"

const Expenses = () => {
  const { expenses, expensesView, selectedExpensesDate, scheduledExpensesView } = useContext(ExpensesContext)

  console.log(selectedExpensesDate, scheduledExpensesView)

  return (
    <div className="expenses-container">
      <ScheduleCalendar></ScheduleCalendar>
      {
        scheduledExpensesView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>
      <Divider/>
      <br/>

      <div className="expenses-add-filter-container">
        <AddExpense></AddExpense>
        <ExpensesFilter></ExpensesFilter>
      </div>

      {
        expenses.length ?
        <div className="expenses-info">
          <h1>Summary</h1>
          <ExpensesSummary></ExpensesSummary>

          {
            expensesView.length ?
              <Fragment>
                <ExpensesGraph></ExpensesGraph>
                <ExpensesTable></ExpensesTable>
              </Fragment> : null
          }
        </div> : null
      }

    </div>
  )
}

export default Expenses