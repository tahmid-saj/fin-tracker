import { useState } from "react";

import "./update-account-form.styles.scss";

import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  monthlyContribution: "",
  monthlyContributionPeriod: "",
  monthlyContributionInterval: "",
  apy: ""
}

const UpdateAccountForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { savingsAccountName, initialDeposit, monthlyContribution, 
    monthlyContributionPeriod, monthlyContributionInterval, apy} = formFields;

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
    <div className="update-savings-account-container">
      <h3>Update Savings Account</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Savings account name" type="text" required onChange={ handleChange }
                          name="savingsAccountName" value={ savingsAccountName }></FormInput>
        
        <FormInput label="Initial deposit" type="text" required onChange={ handleChange }
                          name="initialDeposit" value={ initialDeposit }></FormInput>
        
        <FormInput label="Monthly contribution" type="text" required onChange={ handleChange }
                          name="monthlyContribution" value={ monthlyContribution }></FormInput>
        
        <FormInput label="Over a period of" type="text" required onChange={ handleChange }
                          name="monthlyContributionPeriod" value={ monthlyContributionPeriod }></FormInput>
        
        <div className="update-savings-account-contribution-at">
          <label class="radio-contribution-at">
            <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Months"/>
            <span>Months</span>
          </label>

          <label class="radio-contribution-at">
            <input name="radio-contribution-at" type="radio" id="contributionAt2" value="Years"/>
            <span>Years</span>
          </label>
        </div>

        <FormInput label="APY" type="text" required onChange={ handleChange }
                          name="apy" value={ apy }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Update</Button>
          <Button type="submit">Create</Button>
          <Button type="submit">Close</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccountForm;