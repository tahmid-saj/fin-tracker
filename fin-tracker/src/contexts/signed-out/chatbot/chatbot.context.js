import { useState, createContext } from "react";
import { validateChatBotMessageInput } from "../../../utils/validations/chatbot.validation";
import { getChatBotResponse } from "../../../utils/api-requests/chatbot.requests";

// helper functions
const getChatbotResponseHelper = async (chatbotResponse, messageInput) => {
  if (validateChatBotMessageInput(messageInput)) return chatbotResponse

  const res = await getChatBotResponse(messageInput)
  return res
}

// initial state
export const ChatBotContext = createContext({
  chatbotResponse: "",
  getChatbotResponse: () => {}
})

// chatbot provider
export const ChatBotProvider = ({ children }) => {
  const [chatbotResponse, setChatBotResponse] = useState("")

  const getChatbotResponse = async (messageInput) => {
    const resChatBot = await getChatbotResponseHelper(chatbotResponse, messageInput)
    setChatBotResponse(resChatBot)
  }

  const value = { chatbotResponse, getChatbotResponse }

  return (
    <ChatBotContext.Provider value={ value }>
      { children }
    </ChatBotContext.Provider>
  )
}