import { useState, useContext } from "react";

import "./transfer-money.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

const defaultFormFields = {
  transferTo: "",
  amount: ""
};

const TransferMoney = ({ financeItemInfo }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { transferToBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    transferToBankingAccount(financeItemInfo, formFields.transferTo, formFields.amount, formFields.reason);

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="transfer-money-container">
      <h3>Transfer Money</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Transfer to" type="text" required onChange={ handleChange }
                          name="transferTo" value={ formFields.transferTo }></FormInput>

        <FormInput label="Amount" type="text" required onChange={ handleChange }
                          name="amount" value={ formFields.amount }></FormInput>

        <FormInput label="For" type="text" onChange={ handleChange }
                          name="reason" value={ formFields.reason }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Transfer</Button>
        </div>
      </form>
    </div>
  );
};

export default TransferMoney;