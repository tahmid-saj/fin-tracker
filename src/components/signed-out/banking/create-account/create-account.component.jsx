import React, { Component, useState, useContext } from "react";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import FinanceTrackerItems from "../../finance-tracker-items/finance-tracker-items.component";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import { createBankingAccount } from "../../../../store/signed-out/banking/banking.action";

import "./create-account.styles.jsx";
import { CreateAccountContainer } from "./create-account.styles.jsx";

const defaultFormFields = {
  bankAccountName: ""
};

const CreateAccount = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // const { bankingAccounts, createBankingAccount } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)

  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(createBankingAccount(bankingAccounts, formFields.bankAccountName))

    resetFormFields();

    
  };
    
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormFields({ [name]: value });
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