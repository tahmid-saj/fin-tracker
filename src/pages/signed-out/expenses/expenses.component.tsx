import AddExpense from "../../../components/signed-out/expenses/add-expense/add-expense.component.jsx"
import ExpensesFilter from "../../../components/signed-out/expenses/expenses-filter/expense-filter.component.jsx"
import ExpensesGraph from "../../../components/signed-out/expenses/expenses-graph/expenses-graph.component.jsx"
import ExpensesTable from "../../../components/signed-out/expenses/expenses-table/expenses-table.component.jsx"
import ExpensesSummary from "../../../components/signed-out/expenses/expenses-summary/expenses-summary.component.jsx"
import "./expenses.styles.jsx"
import { ExpensesContainer, ExpensesFilterContainer } from "./expenses.styles.jsx"

import { useEffect, Fragment } from "react"
import { Divider } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { selectExpenses, selectExpensesView, 
  selectExpensesTagLimit, selectFilterConditions, selectSelectedExpensesDate,
  selectScheduledExpensesView
} from "../../../store/signed-out/expenses/expenses.selector.js"
import { setExpensesSummary, setExpensesTagLimit, setExpensesView, 
  filterExpensesHelper, selectScheduledExpensesHelper, setScheduledExpensesView
} from "../../../store/signed-out/expenses/expenses.action.js"

import ScheduleCalendar from "../../../components/signed-out/expenses/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfo from "../../../components/signed-out/expenses/schedule/schedule-day-info/schedule-day-info.component.jsx"

import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"
import { Typography } from "@mui/material";
import { ExpensesFilterInfo } from "../../../components/signed-out/expenses/expenses-filter-info/expenses-filter-info.component.jsx"
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"
import { Expense } from "../../../contexts/signed-out/expenses/expenses.types.js"

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
      
    // Helper function to subtract days
    const subtractDays = (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    };

    const past30Days = subtractDays(new Date(), 30);
    const today = new Date();

    let newAllExpensesCategories: string[] = []
    let newPastMonthExpenses: Expense[] = []
    let newPast30DaysAllExpensesCost: number = 0
  
      const newAllExpensesCost = expenses.reduce((allExpensesCost, expense) => {
        newAllExpensesCategories.push(expense.expenseCategory)
        if (Date.parse(expense.expenseDate) >= past30Days.getTime() && Date.parse(expense.expenseDate) <= today.getTime()) {
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
  
      if (expensesTagLimit) {
        dispatch(setExpensesTagLimit(expensesTagLimit + 1))
      }
    }
  }, [expenses, dispatch])

  // update expensesView when expenses change
  useEffect(() => {
    if (filterConditions) {
      if (expenses) {
        dispatch(setExpensesView(filterExpensesHelper(expenses, filterConditions)))
      }
    } else {
      if (expenses) {
        dispatch(setExpensesView(expenses))
      }
    }
  }, [expenses, filterConditions, dispatch])

  // update scheduledExpensesView when expenses or selectedExpensesDate change
  useEffect(() => {
    if (selectedExpensesDate) {
      if (expenses) {
        dispatch(setScheduledExpensesView(selectScheduledExpensesHelper(expenses, selectedExpensesDate)))
      }
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