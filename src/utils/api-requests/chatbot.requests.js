import { errorOnGetChatBotResponse } from "../errors/chatbot.errors";

// chatbot api requests

// response
export const getChatBotResponse = async (messageInput) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_CHATBOT}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(messageInput)
    })

    const { message } = await response.json()
    return message
  } catch (error) {
    console.log("Error getting chatbot response")
    errorOnGetChatBotResponse()
  }
}

