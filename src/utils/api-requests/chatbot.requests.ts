import { errorOnGetChatBotResponse } from "../errors/chatbot.errors";

import { RANDOM_SEPARATOR } from "../constants/chatbot.constants"

// chatbot api requests

// response
export const getChatBotResponse = async (messageInput: string): Promise<string | undefined> => {
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
    
    errorOnGetChatBotResponse()
  }
}

export const getChatBotResponseStreamGET = (messageInput: string, 
  onChunk: (chunk: string) => void, onDone?: () => void) => {

  const url = `${process.env.REACT_APP_API_URL_CHATBOT}/stream?message=${encodeURIComponent(messageInput)}`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    onChunk(event.data);
  };

  eventSource.addEventListener("end", () => {
    eventSource.close();
    if (onDone) onDone();
  });

  eventSource.onerror = (error) => {
    console.error("SSE connection error:", error);
    eventSource.close();
  };

  return eventSource;
};


export const getChatBotResponseStream = async (
  messageInput: string,
  onChunk: (chunk: string) => void,
  onDone?: () => void
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL_CHATBOT_STREAM}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: String(messageInput)
    })

    if (!response.ok || !response.body) {
      throw new Error("Stream failed to start")
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder("utf-8")

    let partial = ""

    while (true) {
      const { value, done } = await reader.read()
      if (done) break

      // decode the chunk (can be partial!)
      partial += decoder.decode(value, { stream: true })

      // process all complete lines
      let lines = partial.split(RANDOM_SEPARATOR)

      // save last partial line for next read
      partial = lines.pop() ?? ""

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.replace("data: ", "")
          if (data === "[DONE]") {
            if (onDone) onDone()
            return
          }

          try {
            onChunk(data)
          } catch (e) {
            console.warn("Error handling chunk", e)
          }
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error)
  }
}
