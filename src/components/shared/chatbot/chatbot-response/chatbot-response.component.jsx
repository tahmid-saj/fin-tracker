import "./chatbot-response.styles.jsx"
import { ChatBotResponseContainer } from "./chatbot-response.styles.jsx"
import { useContext } from "react"
import { ChatBotContext } from "../../../../contexts/shared/chatbot/chatbot.context"
import { Typography } from "@mui/material"

const ChatBotResponse = () => {
  const { chatbotResponse } = useContext(ChatBotContext)

  return (
    <ChatBotResponseContainer>
      <Typography variant="h6">Chatbot:</Typography>
      <Typography paragraph>{ `${chatbotResponse}` }</Typography>
    </ChatBotResponseContainer>
  )
}

export default ChatBotResponse