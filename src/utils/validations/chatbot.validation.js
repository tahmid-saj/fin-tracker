import { errorOnInvalidMessageInput } from "../errors/chatbot.errors"

// chatbot validation

export const validateChatBotMessageInput = (messageInput) => {
  if (messageInput === "") {
    errorOnInvalidMessageInput()
    return true
  }

  return false
}