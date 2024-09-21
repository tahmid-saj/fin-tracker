import "./chatbot-response.styles.jsx"
import { ChatBotResponseContainer } from "./chatbot-response.styles.jsx"
import { useContext } from "react"
import { ChatBotContext } from "../../../../contexts/shared/chatbot/chatbot.context.js"
import { Typography } from "@mui/material"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js"
import OutlinedCard from "../../mui/card/card.component.js"

const cardStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  margin: "4% 2% 2% 2%"
}

const ChatBotResponse = () => {
  const { chatbotResponse } = useContext(ChatBotContext)

  return (
    <OutlinedCard styles={ cardStyles }>
      <ChatBotResponseContainer>
        <Typography variant="h6">Chatbot:</Typography>
        <br></br>
        <Typography paragraph>{ `${chatbotResponse}` }</Typography>
      </ChatBotResponseContainer>
    </OutlinedCard>
  )
}

export default ChatBotResponse