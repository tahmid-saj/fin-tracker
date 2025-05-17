import styled from "styled-components";
import { PREDICTION_COLOR_CODES } from "../../../../utils/constants/predictions.constants";

export const DailyPredictionHeader = styled.h5`
  color: ${PREDICTION_COLOR_CODES.text[0]};
  justify-content: left;
  align-items: center;
`

export const DailyPredictionContainer = styled.div`
  justify-content: left;
  align-items: center;
  left: 0px;
`