import AddExpense from "../../../components/signed-in/expenses/add-expense/add-expense.component.jsx"
import ExpensesFilter from "../../../components/signed-in/expenses/expenses-filter/expense-filter.component.jsx"
import ExpensesGraph from "../../../components/signed-in/expenses/expenses-graph/expenses-graph.component.jsx"
import ExpensesTable from "../../../components/signed-in/expenses/expenses-table/expenses-table.component.jsx"
import ExpensesSummary from "../../../components/signed-in/expenses/expenses-summary/expenses-summary.component.jsx"
import "./expenses.styles.jsx"
import { ExpensesContainer, ExpensesFilterContainer } from "./expenses.styles.jsx"

import { useContext, Fragment } from "react"
import { ExpensesContext } from "../../../contexts/signed-in/expenses/expenses.context.js"
import ScheduleCalendar from "../../../components/signed-in/expenses/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfo from "../../../components/signed-in/expenses/schedule/schedule-day-info/schedule-day-info.component.jsx"
import { Divider } from "@mui/material"

import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"
import { Typography } from "@mui/material";
import { ExpensesFilterInfo } from "../../../components/signed-out/expenses/expenses-filter-info/expenses-filter-info.component.jsx"
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"

const Expenses = () => {
  const { expenses, expensesView, selectedExpensesDate, scheduledExpensesView } = useContext(ExpensesContext)

  let tabList = []
  let panelList = []

  if (expenses && expenses.length !== 0) {
    tabList.push({
      value: "summary",
      icon: <SummarizeIcon/>,
      label: "Summary"
    })
    tabList.push({
      value: "filter",
      icon: <FilterAltIcon/>,
      label: "Filter"
    })

    panelList.push({
      value: "summary",
      children: <ExpensesSummary/>
    })
    panelList.push({
      value: "filter",
      children: (
        <ExpensesFilterContainer>
          <ExpensesFilter></ExpensesFilter>
          <Typography sx={{ display: "flex", justifyContent: "center", marginTop: "4%", 
            color: COLOR_CODES.general["0"] }} variant="h6">Filtered results</Typography>
          <ExpensesFilterInfo></ExpensesFilterInfo>
          <ExpensesGraph></ExpensesGraph>
          <ExpensesTable></ExpensesTable>
        </ExpensesFilterContainer>
      )
    })
  }

  tabList.push({
    value: "add-expense",
    icon: <AddIcon/>,
    label: "Add Expense"
  })
  panelList.push({
    value: "add-expense",
    children: <AddExpense></AddExpense>
  })

  return (
    <ExpensesContainer>
      <ScheduleCalendar></ScheduleCalendar>
      {
      selectedExpensesDate && scheduledExpensesView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>

      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </ExpensesContainer>
  )

  // return (
  //   <div className="expenses-container">
  //     <ScheduleCalendar></ScheduleCalendar>
  //     {
  //       scheduledExpensesView ?
  //       <ScheduleDayInfo></ScheduleDayInfo> : null
  //     }

  //     <br/>
  //     <Divider/>
  //     <br/>

  //     <div className="expenses-add-filter-container">
  //       <AddExpense></AddExpense>
  //       <ExpensesFilter></ExpensesFilter>
  //     </div>

  //     {
  //       expenses.length ?
  //       <div className="expenses-info">
  //         <h1>Summary</h1>
  //         <ExpensesSummary></ExpensesSummary>

  //         {
  //           expensesView.length ?
  //             <Fragment>
  //               <ExpensesGraph></ExpensesGraph>
  //               <ExpensesTable></ExpensesTable>
  //             </Fragment> : null
  //         }
  //       </div> : null
  //     }

  //   </div>
  // )
}

export default Expenses