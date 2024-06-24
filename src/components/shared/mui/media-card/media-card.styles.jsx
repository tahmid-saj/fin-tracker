import styled from "styled-components"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"

export const CardMediaContainer = styled.div`
  cursor: pointer;

  &:hover {
    background-color: ${COLOR_CODES.general["4"]};
  }
`