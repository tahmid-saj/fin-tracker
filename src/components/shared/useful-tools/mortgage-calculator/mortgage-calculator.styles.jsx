import styled from "styled-components";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

export const MortgageCalculatorContainer = styled.div`
  background-color: ${COLOR_CODES.general["1"]};
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px 1px ${COLOR_CODES.general["2"]};
  border-radius: 1.5rem;
  margin: 2% 10% 2% 10%;
  padding: 2%;
`

export const MortgageCalculatorForm = styled.form`
  margin: 2% 20% 2% 20%;
`