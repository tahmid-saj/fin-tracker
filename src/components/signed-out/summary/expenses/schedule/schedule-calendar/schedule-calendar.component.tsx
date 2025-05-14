// signed out
import "./schedule-calendar.styles.jsx"
import { CalendarTodoList, ExpensesCalendarContainer } from "./schedule-calendar.styles.jsx";
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants.ts";
import { useDispatch, useSelector } from "react-redux"
import { selectExpenses } from "../../../../../../store/signed-out/expenses/expenses.selector.ts";
import { selectScheduledExpenses } from "../../../../../../store/signed-out/expenses/expenses.action.ts";
import { Expense } from "../../../../../../store/signed-out/expenses/expenses.types.ts";

function getScheduledData(date: Date, expenses: Expense[]) {
  const dateStr = date.toISOString().split('T')[0]

  let scheduledExpensesForDate: Expense[] = []
  expenses.map((expense) => {
    if (expense.expenseDate === dateStr) {
      scheduledExpensesForDate.push({
        expenseFor: expense.expenseFor,
        expenseCost: expense.expenseCost,
        expenseDate: expense.expenseDate,
        expenseCategory: expense.expenseCategory,
        expenseId: expense.expenseId
      })
    }
  })

  return scheduledExpensesForDate
}

const ScheduleCalendar = () => {
  const expenses = useSelector(selectExpenses)
  const dispatch = useDispatch()

  function renderCell(date: Date) {
    const list = getScheduledData(date, expenses!);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <CalendarTodoList>
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{`${item.expenseFor}:`}</b> ${item.expenseCost}
              </li>
            ))}
            {moreCount ? `${moreCount} more` : null}
          </CalendarTodoList>
          {/* {moreCount} more */}
        </Fragment>
      );
    }

    return null;
  }

  const onSelectDate = (date: Date) => {
    const selectedDate = date.toISOString().split('T')[0]
    
    dispatch(selectScheduledExpenses(selectedDate))
  }

  return (
    <ExpensesCalendarContainer>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Expenses calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["5"] }}/>
    </ExpensesCalendarContainer>
  )
}

export default ScheduleCalendar