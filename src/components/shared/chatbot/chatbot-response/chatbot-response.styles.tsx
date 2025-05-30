import styled from "styled-components"

export const ChatBotResponseContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap; // changed from pre-line
  word-break: break-word;
  padding: 2%;
  overflow-x: auto;

  p {
    margin: 0.5rem 0;
  }

  strong {
    font-weight: bold;
  }

  ul {
    padding-left: 1.5rem;
  }

  code {
    background-color: #2e2e2e;
    color: #f8f8f8;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 0.9em;
  }
`
