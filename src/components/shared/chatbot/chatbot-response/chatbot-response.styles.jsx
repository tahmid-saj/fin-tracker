import styled from "styled-components"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"

export const ChatBotResponseContainer = styled.div`
  background-color: ${COLOR_CODES.general["5"]};
  border-radius: 1.5rem;
  box-shadow: 1px 1px 1px 1px ${COLOR_CODES.general["5"]};
  display: block;
  justify-content: center;
  align-items: center;
  padding: 3% 5% 3% 5%;
  margin-bottom: 3%;
  white-space: pre-line;
`