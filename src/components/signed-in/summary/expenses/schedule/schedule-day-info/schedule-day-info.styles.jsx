import styled from "styled-components";
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants";

export const ExpensesScheduleDayInfo = styled.div`
  display: flex;
  /* justify-content: center; */
  /* padding: 2% 2% 2% 2%; */
  padding: 2% 2% 0.5% 2%;

  overflow: auto;
  scrollbar-color: ${COLOR_CODES.scrollbar.scroll} ${COLOR_CODES.scrollbar.background};
  scrollbar-width: thin;
`