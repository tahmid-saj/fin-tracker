import styled from "styled-components";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

export const MortgageCalculatorResultContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${COLOR_CODES.general["0"]};
  box-shadow: 4px 4px ${COLOR_CODES.general["0"]};
  border-radius: 1.5rem;
  margin-top: 4%;
`

export const MortgageResult = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  padding: 2%;
`