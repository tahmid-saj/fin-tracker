import styled from "styled-components";
import { PREDICTION_COLOR_CODES } from "../../../../../utils/constants/predictions.constants";

export const TwoWeekPredictionsGraphContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  background-color: ${PREDICTION_COLOR_CODES.shared[0]};
  border-radius: 0.5rem;
  box-shadow: 5px 5px #000000;
  padding: 2%;
`