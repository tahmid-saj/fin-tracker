import "./schedule-calendar.styles.jsx"
import { CalendarTodoList,
  ExpensesCalendarContainer
} from "./schedule-calendar.styles.jsx";

import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";
import { ExpensesContext } from "../../../../../contexts/signed-in/expenses/expenses.context";

function getScheduledData(date, expenses) {
  date = date.toISOString().split('T')[0]

  let scheduledExpensesForDate = []
  expenses.map((expense) => {
    if (expense.expenseDate === date) {
      scheduledExpensesForDate.push({
        expenseFor: expense.expenseFor,
        expenseCost: expense.expenseCost,
      })
    }
  })

  return scheduledExpensesForDate
}

const ScheduleCalendar = () => {
    const { expenses, selectScheduledExpenses } = useContext(ExpensesContext)

  function renderCell(date) {
    const list = getScheduledData(date, expenses);
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

  const onSelectDate = (date) => {
    const selectedDate = date.toISOString().split('T')[0]
    
    selectScheduledExpenses(selectedDate)
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