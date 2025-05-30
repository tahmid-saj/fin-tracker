import React, { useState, createContext, ReactNode, FC } from "react";
import { validateChatBotMessageInput } from "../../../utils/validations/chatbot.validation";
import { getChatBotResponseStream } from "../../../utils/api-requests/chatbot.requests";
import { ChatBotContextType, ChatBotProviderProps } from "./chatbot.types";

// initial state
export const ChatBotContext = createContext<ChatBotContextType>({
  chatbotResponse: "",
  getChatbotResponse: () => {}
});

// chatbot provider
export const ChatBotProvider: FC<ChatBotProviderProps> = ({ children }) => {
  const [chatbotResponse, setChatBotResponse] = useState<string>("");

  const getChatbotResponse = async (messageInput: string) => {
    if (validateChatBotMessageInput(messageInput)) return;

    // Reset response before new stream
    setChatBotResponse("");

    await getChatBotResponseStream(
      messageInput,
      (chunk: string) => {
        // Append each chunk to the current state
        setChatBotResponse(prev => prev + chunk)
      },
      () => {
        console.log("Streaming completed");
      }
    );
  };

  const value = { chatbotResponse, getChatbotResponse };

  return (
    <ChatBotContext.Provider value={value}>
      {children}
    </ChatBotContext.Provider>
  );
};
