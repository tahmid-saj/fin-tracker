import "./schedule-calendar.styles.scss"
import 'rsuite/Calendar/styles/index.css';
import { Fragment, useContext, useState } from "react";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../../utils/constants/shared.constants";
import { useDispatch, useSelector } from "react-redux"
import { selectInsurancePayments } from "../../../../../store/signed-out/insurance/insurance.selector";
import { selectScheduledInsurancePayments } from "../../../../../store/signed-out/insurance/insurance.action";

function getScheduledData(date, insurancePayments) {
  date = date.toISOString().split('T')[0]

  let scheduledInsurancePaymentsForDate = []
  insurancePayments.map((insurancePayment) => {
    if (insurancePayment.insuranceDate === date) {
      scheduledInsurancePaymentsForDate.push({
        insuranceFor: insurancePayment.insuranceFor,
        insurancePayment: insurancePayment.insurancePayment,
      })
    }
  })

  return scheduledInsurancePaymentsForDate
}

const ScheduleCalendar = () => {
  const dispatch = useDispatch()
  const insurancePayments = useSelector(selectInsurancePayments)

  function renderCell(date) {
    const list = getScheduledData(date, insurancePayments);
    const displayList = list.filter((item, index) => index < 1);

    if (list.length) {
      const moreCount = list.length - displayList.length;

      return (
        <Fragment>
          <ul className="calendar-todo-list">
            {displayList.map((item, index) => (
              <li key={index}>
                <Badge /> <b>{`${item.insuranceFor}:`}</b> ${item.insurancePayment}
              </li>
            ))}
            {moreCount ? `${moreCount} more` : null}
          </ul>
          {/* {moreCount} more */}
        </Fragment>
      );
    }

    return null;
  }

  const onSelectDate = (date) => {
    const selectedDate = date.toISOString().split('T')[0]
    console.log(selectedDate)
    dispatch(selectScheduledInsurancePayments(selectedDate))
  }

  return (
    <div className="insurance-schedule-calendar-container" style={{ backgroundColor: COLOR_CODES.general["5"] }}>
      <Typography sx={{ display: "flex", marginLeft: "1%" }} 
        variant="h6">{`Insurance calendar`}</Typography>
      <Calendar bordered renderCell={ renderCell } onSelect={ onSelectDate } style={{ backgroundColor: COLOR_CODES.general["5"] }}/>
    </div>
  )
}

export default ScheduleCalendar