import React, { Component, useState, useContext, FormEvent, ChangeEvent } from "react";

import FormInput from "../../../shared/form-input/form-input.component.js";
import Button from "../../../shared/button/button.component.js";
import FinanceTrackerItems from "../../finance-tracker-items/finance-tracker-items.component.jsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.js";

import "./create-account.styles.js";
import { CreateAccountContainer } from "./create-account.styles.js";

type FormFields = {
  bankAccountName: string
}

const defaultFormFields = {
  bankAccountName: ""
};

const CreateAccount = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const { bankingAccounts, createBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     
    createBankingAccount(formFields.bankAccountName);
    resetFormFields();
  };
    
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <CreateAccountContainer onSubmit={ (e) => handleSubmit(e) }>
      <div className="container">
      <FormInput label="Account name" type="text" required
                onChange={ (e) => handleChange(e) }
                name="bankAccountName" value={ formFields.bankAccountName }></FormInput>

        <div className="row">
          <div className="col-12">
            <div className="btn-group flex-wrap">
              <Button type="submit">Create Account</Button>
            </div>
          </div>
        </div>
      </div>
    </CreateAccountContainer>
  );
};


export default CreateAccount;