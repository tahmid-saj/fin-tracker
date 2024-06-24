import styled from "styled-components";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

export const CurrencyConverterResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR_CODES.general["0"]};
  box-shadow: 4px 4px ${COLOR_CODES.general["0"]};
  border-radius: 1.5rem;
  padding: 2%;
  margin-top: 6%;
`