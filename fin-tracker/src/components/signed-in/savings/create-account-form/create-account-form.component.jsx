import { useState } from "react";

import "./create-account-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  startDate: "",
  monthlyContribution: "",
  monthlyContributionPeriod: "",
  monthlyContributionInterval: "",
  apy: ""
}

const CreateAccountForm = ({ label, financeTrackerItemNames }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { savingsAccountName, initialDeposit, startDate, monthlyContribution, 
    monthlyContributionPeriod, monthlyContributionInterval, apy} = formFields;

  const [savingsAccounts, setSavingsAccounts] = useState(financeTrackerItemNames);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleCreateSubmit = (event) => {
    if (savingsAccountName === "" || !savingsAccountName) {
      return;
    }

    event.preventDefault();

    setSavingsAccounts([...savingsAccounts, formFields.savingsAccountName]);

    console.log(formFields.savingsAccountName);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <div className="update-savings-account-container">
      <FinanceTrackerItems label={ label } financeTrackerItemNames={ savingsAccounts }></FinanceTrackerItems>

      <h3>Create Savings Account</h3>

      <form className="create-savings-account-container" onSubmit={ handleSubmit }>
        <FormInput label="Savings account name" type="text" required onChange={ handleChange }
                          name="savingsAccountName" value={ savingsAccountName }></FormInput>
        
        <FormInput label="Initial deposit" type="text" required onChange={ handleChange }
                          name="initialDeposit" value={ initialDeposit }></FormInput>

        <h5>Start date</h5>
        <FormInput type="date" required name="startDate" value={ startDate }></FormInput>
        
        <FormInput label="Monthly contribution" type="text" required onChange={ handleChange }
                          name="monthlyContribution" value={ monthlyContribution }></FormInput>
        
        <FormInput label="Over a period of" type="text" required onChange={ handleChange }
                          name="monthlyContributionPeriod" value={ monthlyContributionPeriod }></FormInput>
        
        <div className="update-savings-account-contribution-at">
          <label className="radio-contribution-at">
            <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Months"/>
            <span>Months</span>
          </label>

          <label className="radio-contribution-at">
            <input name="radio-contribution-at" type="radio" id="contributionAt2" value="Years"/>
            <span>Years</span>
          </label>
        </div>

        <FormInput label="APY" type="text" required onChange={ handleChange }
                          name="apy" value={ apy }></FormInput>
        
        <div className="buttons-container">
          {/* <button className="saving-button-update">Update</button> */}
          <button className="saving-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button>
          {/* <button className="saving-button-close">Close</button> */}
        </div>
      </form>
    </div>
  );
};

export default CreateAccountForm;