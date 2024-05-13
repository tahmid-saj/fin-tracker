import "./chatbot-response.styles.scss"
import { useContext } from "react"
import { ChatBotContext } from "../../../../contexts/shared/chatbot/chatbot.context"

const ChatBotResponse = () => {
  const { chatbotResponse } = useContext(ChatBotContext)

  return (
    <div className="chatbot-response-container">
      <h5>Chatbot:</h5>
      <p>{ `${chatbotResponse}` }</p>
    </div>
  )
}

export default ChatBotResponse