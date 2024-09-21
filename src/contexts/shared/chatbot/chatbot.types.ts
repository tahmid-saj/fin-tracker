import { ReactNode } from "react";

// chatbot types

export interface ChatBotContextType {
  chatbotResponse: string;
  getChatbotResponse: (messageInput: string) => void;
}

export interface ChatBotProviderProps {
  children: ReactNode
}