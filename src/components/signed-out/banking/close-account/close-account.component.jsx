import { useState, useContext } from "react";

import "./close-account.styless.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

import { PERMANENTLY_DELETE } from "../../../../utils/constants/banking.constants";

const defaultFormFields = {
  confirmDelete: ""
};

const CloseAccount = ({ financeItemInfo }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { closeBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields.confirmDelete);

    if (formFields.confirmDelete === PERMANENTLY_DELETE) {
      closeBankingAccount(financeItemInfo);
    } else {
      return;
    }

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <div className="close-account-container">
      <h3>Close Account</h3>
      <h6>Enter 'permanently delete'</h6>

      <form onSubmit={ handleSubmit }>
        <FormInput type="text" required onChange={ handleChange }
                          name="confirmDelete" value={ formFields.confirmDelete }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Close</Button>
        </div>
      </form>
    </div>
  );
};

export default CloseAccount;