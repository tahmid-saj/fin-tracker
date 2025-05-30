import "./chatbot-response.styles.tsx"
import { ChatBotResponseContainer } from "./chatbot-response.styles.tsx"
import { useContext } from "react"
import { ChatBotContext } from "../../../../contexts/shared/chatbot/chatbot.context.tsx"
import { Typography } from "@mui/material"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import OutlinedCard from "../../mui/card/card.component.tsx"
import ReactMarkdown from "react-markdown"

const cardStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  margin: "4% 2% 2% 2%"
}

const ChatBotResponse = () => {
  const { chatbotResponse } = useContext(ChatBotContext)

  return (
    <OutlinedCard styles={cardStyles}>
      <ChatBotResponseContainer>
        <Typography variant="h6">Chatbot:</Typography>
        <br />
        <div className="prose prose-invert max-w-none whitespace-pre-wrap">
          <ReactMarkdown>{chatbotResponse}</ReactMarkdown>
        </div>
      </ChatBotResponseContainer>
    </OutlinedCard>
  )
}

export default ChatBotResponse
