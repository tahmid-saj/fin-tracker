import styled from "styled-components";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants";

export const CalendarTodoList = styled.ul`
  text-align: left;
  padding: 0;
  list-style: none;

  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const ExpensesCalendarContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  padding: 1%;
  background-color: ${COLOR_CODES.general["5"]};
`