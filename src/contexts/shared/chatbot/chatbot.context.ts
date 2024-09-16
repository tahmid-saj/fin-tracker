import { useState, createContext, ReactNode } from "react";
import { validateChatBotMessageInput } from "../../../utils/validations/chatbot.validation";
import { getChatBotResponse } from "../../../utils/api-requests/chatbot.requests";

// helper functions
const getChatbotResponseHelper = async (chatbotResponse: string, messageInput: string): Promise<string> => {
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
export const ChatBotProvider = ({ children: ReactNode }) => {
  const [chatbotResponse, setChatBotResponse] = useState<string>("")

  const getChatbotResponse = async (messageInput: string) => {
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