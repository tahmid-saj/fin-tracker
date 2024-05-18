import { useState, Component, useContext } from "react";

import "./create-account-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";

import InvestmentSavingsTrackerItems from "../../investment-savings-tracker-items/investment-savings-tracker-items.component";

import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  startDate: "",
  monthlyContribution: "",
  contributionPeriod: "",
  contributionInterval: "Months",
  apy: ""
}

const CreateAccountForm = ({ label }) => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { createSavingsAccount } = useContext(SavingsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formFields.savingsAccountName === "" || !formFields.savingsAccountName ||
      formFields.initialDeposit === "" || !formFields.initialDeposit ||
      formFields.startDate === "" || !formFields.startDate ||
      formFields.monthlyContribution === "" || !formFields.monthlyContribution || 
      formFields.contributionPeriod === "" || !formFields.contributionPeriod ||
      formFields.contributionInterval === "" || !formFields.contributionInterval ||
      formFields.apy === "" || !formFields.apy) {

      console.log('please enter all fields');

      return;
    }

    createSavingsAccount(formFields);
    resetFormFields();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // render() {
    return (
      <div className="update-savings-account-container">
        <InvestmentSavingsTrackerItems label={ label }></InvestmentSavingsTrackerItems>

        <h3>Track savings</h3>

        <form className="create-savings-account-container" onSubmit={ handleSubmit }>
          <FormInput label="Savings account name" type="text" required onChange={ handleChange }
                            name="savingsAccountName" value={ formFields.savingsAccountName }></FormInput>
          
          <FormInput label="Initial deposit" type="text" required onChange={ handleChange }
                            name="initialDeposit" value={ formFields.initialDeposit }></FormInput>

          <h5>Start date</h5>
          <FormInput type="date" required name="startDate" value={ formFields.startDate }
                      onChange={ handleChange }></FormInput>
          
          <FormInput label="Monthly contribution" type="text" required onChange={ handleChange }
                            name="monthlyContribution" value={ formFields.monthlyContribution }></FormInput>
          
          <div className="contribution-interval-container">
            <FormInput label="Over a period of" type="text" required onChange={ handleChange }
                              name="contributionPeriod" value={ formFields.contributionPeriod }></FormInput>

            <select className="dropButton" name="contributionInterval" id="contributionInterval" 
                    onChange={ handleChange } value={ formFields.contributionInterval }>

              <option value="Months">Months</option>
              <option value="Years">Years</option>
            </select>
          </div>

          <FormInput label="APY" type="text" required onChange={ handleChange }
                            name="apy" value={ formFields.apy }></FormInput>
          
          <div className="buttons-container">
            <button className="saving-button-create" type="submit">Create</button>
          </div>
        </form>
      </div>
    )
}

export default CreateAccountForm;