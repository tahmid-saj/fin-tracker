import AddExpense from "../../../components/signed-out/expenses/add-expense/add-expense.component"
import ExpensesFilter from "../../../components/signed-out/expenses/expenses-filter/expense-filter.component"
import ExpensesGraph from "../../../components/signed-out/expenses/expenses-graph/expenses-graph.component"
import ExpensesTable from "../../../components/signed-out/expenses/expenses-table/expenses-table.component"
import ExpensesSummary from "../../../components/signed-out/expenses/expenses-summary/expenses-summary.component"
import "./expenses.styles.jsx"
import { ExpensesContainer, ExpensesFilterContainer } from "./expenses.styles.jsx"

import { useEffect, Fragment } from "react"
import { Divider } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { selectExpenses, selectExpensesView, 
  selectExpensesTagLimit, selectFilterConditions, selectSelectedExpensesDate,
  selectScheduledExpensesView
} from "../../../store/signed-out/expenses/expenses.selector"
import { setExpensesSummary, setExpensesTagLimit, setExpensesView, 
  filterExpensesHelper, selectScheduledExpensesHelper, setScheduledExpensesView
} from "../../../store/signed-out/expenses/expenses.action"

import ScheduleCalendar from "../../../components/signed-out/expenses/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-out/expenses/schedule/schedule-day-info/schedule-day-info.component"

import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"
import { Typography } from "@mui/material";
import { ExpensesFilterInfo } from "../../../components/signed-out/expenses/expenses-filter-info/expenses-filter-info.component.jsx"
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"

const Expenses = () => {
  // const { expenses, expensesView } = useContext(ExpensesContext)
  const expenses = useSelector(selectExpenses)
  const expensesView = useSelector(selectExpensesView)
  const expensesTagLimit = useSelector(selectExpensesTagLimit)
  const filterConditions = useSelector(selectFilterConditions)
  const selectedExpensesDate = useSelector(selectSelectedExpensesDate)
  const scheduledExpensesView = useSelector(selectScheduledExpensesView)
  const dispatch = useDispatch()

  // update expensesSummary
  useEffect(() => {
    if (expenses && expenses.length) {
      // let newAllExpensesCategories = []
      // const newAllExpensesCost = expenses.reduce((allExpensesCost, { expenseCost, expenseCategory }) => {
      //   newAllExpensesCategories.push(expenseCategory)
      //   return allExpensesCost + expenseCost
      // }, 0)
      
      // setExpensesSummary({
      //   currentAllExpensesCost: newAllExpensesCost,
      //   currentAllExpensesCategories: newAllExpensesCategories
      // })
      
      Date.prototype.subtractDays = function (d) {
        this.setDate(this.getDate() - d);
        return this;
      }
      let past30Days = new Date()
      let today = new Date()
      past30Days.subtractDays(30)
      console.log(past30Days)
  
      let newAllExpensesCategories = []
      let newPastMonthExpenses = []
      let newPast30DaysAllExpensesCost = 0
  
      const newAllExpensesCost = expenses.reduce((allExpensesCost, expense) => {
        newAllExpensesCategories.push(expense.expenseCategory)
        if (Date.parse(expense.expenseDate) >= past30Days && Date.parse(expense.expenseDate) <= today) {
          newPast30DaysAllExpensesCost += expense.expenseCost
          newPastMonthExpenses.push(expense)
        }
  
        return allExpensesCost + expense.expenseCost
      }, 0)
      
      dispatch(setExpensesSummary({
        currentAllExpensesCost: newAllExpensesCost,
        currentAllExpensesCategories: newAllExpensesCategories,
        pastMonthAllExpensesCost: newPast30DaysAllExpensesCost,
        pastMonthExpenses: newPastMonthExpenses
      }))
  
      dispatch(setExpensesTagLimit(expensesTagLimit + 1))
    }
  }, [expenses, dispatch])

  // update expensesView when expenses change
  useEffect(() => {
    if (filterConditions) {
      dispatch(setExpensesView(filterExpensesHelper(expenses, filterConditions)))
    } else {
      dispatch(setExpensesView(expenses))
    }
  }, [expenses, filterConditions, dispatch])

  // update scheduledExpensesView when expenses or selectedExpensesDate change
  useEffect(() => {
    if (selectedExpensesDate) {
      dispatch(setScheduledExpensesView(selectScheduledExpensesHelper(expenses, selectedExpensesDate)))
    } else {
      dispatch(setScheduledExpensesView(null))
    }
  }, [expenses, selectedExpensesDate, dispatch])

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
  //     selectedExpensesDate && scheduledExpensesView ?
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
  //       expenses && expenses.length ?
  //       <div className="expenses-info">
  //         <h1>Summary</h1>
  //         <ExpensesSummary></ExpensesSummary>

  //         {
  //           expensesView && expensesView.length ?
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