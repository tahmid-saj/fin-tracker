import "./schedule-calendar.styles.tsx"
import { CalendarTodoList, InsuranceCalendarContainer } from "./schedule-calendar.styles.tsx";
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants.ts";
import { InsuranceContext } from "../../../../../contexts/signed-in/insurance/insurance.context.tsx";
import { InsurancePayment } from "../../../../../contexts/signed-in/insurance/insurance.types.ts";

function getScheduledData(date: Date, insurancePayments: InsurancePayment[]) {
  const dateStr = date.toISOString().split('T')[0]

  let scheduledInsurancePaymentsForDate: InsurancePayment[] = []
  insurancePayments.map((insurancePayment) => {
    if (insurancePayment.insuranceDate === dateStr) {
      scheduledInsurancePaymentsForDate.push({
        insuranceFor: insurancePayment.insuranceFor,
        insurancePayment: insurancePayment.insurancePayment,
        insuranceInterval: insurancePayment.insuranceInterval,
        insuranceDate: insurancePayment.insuranceDate
      })
    }
  })

  return scheduledInsurancePaymentsForDate
}

const ScheduleCalendar = () => {
  const { insurancePayments, selectScheduledInsurancePayments } = useContext(InsuranceContext)

  function renderCell(date: Date) {
    const list = getScheduledData(date, insurancePayments);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <CalendarTodoList>
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{`${item.insuranceFor}:`}</b> ${item.insurancePayment}
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
    
    selectScheduledInsurancePayments(selectedDate)
  }

  return (
    <InsuranceCalendarContainer>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Insurance calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["5"] }}/>
    </InsuranceCalendarContainer>
  )
}

export default ScheduleCalendar