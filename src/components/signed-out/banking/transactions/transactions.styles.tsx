import styled from "styled-components";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

export const TransactionsContainer = styled.div`
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px ${COLOR_CODES.general["5"]};
  display: block;
  justify-content: top;
  padding: 1%;

  overflow: auto;
  scrollbar-color: ${COLOR_CODES.scrollbar.scroll} ${COLOR_CODES.scrollbar.background};
  scrollbar-width: thin;
`