import { useState, useContext } from "react"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import "./chatbot.styles.jsx"
import { ChatBotContainer, ChatBotInputMessage } from "./chatbot.styles.jsx"
import ChatBotResponse from "./chatbot-response/chatbot-response.component"
import { ChatBotContext } from "../../../contexts/shared/chatbot/chatbot.context"
import { Divider, Typography } from "@mui/material"

const defaultFormFields = {
  messageInput: ""
}

const ChatBot = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { getChatbotResponse, chatbotResponse } = useContext(ChatBotContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await getChatbotResponse(formFields.messageInput)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <ChatBotContainer>
      <Typography variant="h6">Ask the chatbot for some financial advice</Typography>
      <Typography paragraph>Example: Can you give me some financial advice?</Typography>

      <ChatBotInputMessage onSubmit={ handleSubmit }>
        <FormInput label="Message chatbot" type="text" required onChange={ handleChange }
                  name="messageInput" value={ formFields.messageInput }/>
        <div className="buttons-container">
          <Button type="submit">Send Message</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </ChatBotInputMessage>

      {
        chatbotResponse !== "" && chatbotResponse !== undefined &&
        <ChatBotResponse></ChatBotResponse>
      }

      <Divider orientation="horizontal" flexItem/>

    </ChatBotContainer>
  )
}

export default ChatBot