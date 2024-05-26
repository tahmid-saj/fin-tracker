import { useState, useContext } from "react";

import "./withdraw.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

const defaultFormFields = {
  amount: "",
  reason: "",
};

const Withdraw = ({ financeItemInfo }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { withdrawFromBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    withdrawFromBankingAccount(financeItemInfo, formFields.amount, formFields.reason);

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="withdraw-container">
      <h3>Withdraw</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Amount" type="text" required onChange={ handleChange }
                          name="amount" value={ formFields.amount }></FormInput>

        <FormInput label="For" type="text" onChange={ handleChange }
                          name="reason" value={ formFields.reason }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Withdraw</Button>
        </div>
      </form>
    </div>
  );
};


export default Withdraw;