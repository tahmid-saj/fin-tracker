import React, { useState, createContext, ReactNode, FC } from "react";
import { validateChatBotMessageInput } from "../../../utils/validations/chatbot.validation";
import { getChatBotResponse } from "../../../utils/api-requests/chatbot.requests";
import { ChatBotContextType, ChatBotProviderProps } from "./chatbot.types";

// helper functions
const getChatbotResponseHelper = async (chatbotResponse: string, messageInput: string): Promise<string | undefined> => {
  if (validateChatBotMessageInput(messageInput)) return chatbotResponse

  const res = await getChatBotResponse(messageInput)
  return res
}

// initial state
export const ChatBotContext = createContext<ChatBotContextType>({
  chatbotResponse: "",
  getChatbotResponse: () => {}
})

// chatbot provider
export const ChatBotProvider: FC<ChatBotProviderProps> = ({ children }) => {
  const [chatbotResponse, setChatBotResponse] = useState<string>("")

  const getChatbotResponse = async (messageInput: string) => {
    const resChatBot = await getChatbotResponseHelper(chatbotResponse, messageInput)
    if (resChatBot) {
      setChatBotResponse(resChatBot)
    }
  }

  const value = { chatbotResponse, getChatbotResponse }

  return (
    <ChatBotContext.Provider value={ value }>
      { children }
    </ChatBotContext.Provider>
  )
}