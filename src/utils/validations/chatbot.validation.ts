import { errorOnInvalidMessageInput } from "../errors/chatbot.errors"

// chatbot validation

export const validateChatBotMessageInput = (messageInput: string): boolean => {
  if (messageInput === "") {
    errorOnInvalidMessageInput()
    return true
  }

  return false
}