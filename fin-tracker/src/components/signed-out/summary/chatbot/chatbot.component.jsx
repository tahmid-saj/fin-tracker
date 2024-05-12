import { useState } from "react"
import FormInput from "../../../shared/form-input/form-input.component"
import Button from "../../../shared/button/button.component"
import "./chatbot.styles.scss"

const defaultFormFields = {
  messageInput: ""
}

const ChatBot = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="chatbot-container">
      <h3>Ask the chatbot for some financial advice</h3>
      <h5>Example: Can you give me some financial advice?</h5>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Message chatbot" type="text" required onChange={ handleChange }
                  name="messageInput" value={ formFields.messageInput }/>
        <div className="buttons-container">
          <Button type="submit">Send Message</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </div>
      </form>

      <hr className="rounded"></hr>
    </div>
  )
}

export default ChatBot