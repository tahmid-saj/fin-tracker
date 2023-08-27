import React, { useState } from "react";

import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";

const defaultFormFields = {
  bankAccountName: ""
};

const CreateAccount = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { bankAccountName } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <form onSubmit={ handleSubmit }>
      <FormInput label="Account Name" type="text" required onChange={ handleChange }
                  name="bankAccountName" value={ bankAccountName }></FormInput>

      <div className="buttons-container">
        <Button type="submit">Create Account</Button>
      </div>
    </form>
  );
};

export default CreateAccount;