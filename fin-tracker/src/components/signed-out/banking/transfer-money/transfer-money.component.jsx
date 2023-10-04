import { useState } from "react";

import "./transfer-money.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

const defaultFormFields = {
  transferTo: "",
  amount: ""
};

const TransferMoney = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { transferTo, amount } = formFields;

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
    <div className="transfer-money-container">
      <h3>Transfer Money</h3>

      <form onSubmit={ handleSubmit }>
      <FormInput label="Transfer to" type="text" required onChange={ handleChange }
                          name="transferTo" value={ transferTo }></FormInput>

        <FormInput label="Amount" type="text" required onChange={ handleChange }
                          name="amount" value={ amount }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Transfer</Button>
        </div>
      </form>
    </div>
  );
};

export default TransferMoney;