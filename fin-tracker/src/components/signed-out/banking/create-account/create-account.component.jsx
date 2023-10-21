import React, { Component, useState, useContext } from "react";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import FinanceTrackerItems from "../../finance-tracker-items/finance-tracker-items.component";

import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

import "./create-account.styles.scss";

const defaultFormFields = {
  bankAccountName: ""
};

const CreateAccount = ({ label }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { bankingAccounts, createBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createBankingAccount(formFields.bankAccountName);
    resetFormFields();

    console.log(bankingAccounts);
  };
    
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormFields({ [name]: value });
  };

  return (
    <div>
      <FinanceTrackerItems label={ label }></FinanceTrackerItems>

      <form onSubmit={ (e) => handleSubmit(e) } className="create-account-container">
        <FormInput label="Account name" type="text" required
                  onChange={ (e) => handleChange(e) }
                  name="bankAccountName" value={ formFields.bankAccountName }></FormInput>

        <div className="buttons-container">
          <Button type="submit">Create Account</Button>
        </div>

      </form>
    </div>
  );
};

export default CreateAccount;