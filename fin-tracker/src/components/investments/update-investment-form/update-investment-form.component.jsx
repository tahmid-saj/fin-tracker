import { useState } from "react";

import "./update-investment-form.styles.scss";

import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";

const defaultFormFields = {
  investmentName: "",
  investmentType: "",
  startingAmount: "",
  afterYears: "",
  returnRate: "",
  compounded: "",
  additionalContribution: "",
  contributionAt: "",
  contributionInterval: ""
}

const UpdateInvestmentForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { investmentName, investmentType, startingAmount, afterYears, returnRate, 
    compounded, additionalContribution, contributionAt, contributionInterval } = formFields;

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
    <div className="update-investment-container">
      <h3>Update Investment</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Investment name" type="text" required onChange={ handleChange }
                          name="investmentName" value={ investmentName }></FormInput>
        
        <FormInput label="Investment type" type="text" required onChange={ handleChange }
                          name="investmentType" value={ investmentType }></FormInput>
        
        <FormInput label="Starting amount" type="text" required onChange={ handleChange }
                          name="startingAmount" value={ startingAmount }></FormInput>
        
        <FormInput label="After how many years?" type="text" required onChange={ handleChange }
                          name="afterYears" value={ afterYears }></FormInput>
        
        <FormInput label="Return rate" type="text" required onChange={ handleChange }
                          name="returnRate" value={ returnRate }></FormInput>
        
        <FormInput label="Compounded" type="text" required onChange={ handleChange }
                          name="compounded" value={ compounded }></FormInput>
        
        <FormInput label="Additional contribution" type="text" required onChange={ handleChange }
                          name="additionalContribution" value={ additionalContribution }></FormInput>

        <div className="update-investment-contribution-at">
          <h5>Contribution at the</h5>

          <label class="radio-contribution-at">
            <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Beginning"/>
            <span>Beginning</span>
          </label>

          <label class="radio-contribution-at">
            <input name="radio-contribution-at" type="radio" id="contributionAt2" value="End"/>
            <span>End</span>
          </label>
        </div>

        <div className="update-investment-contribution-interval">
          <h5>of each</h5>

          <label class="radio-contribution-interval">
            <input name="radio-contribution-interval" type="radio" checked id="contributionInterval1" value="Month"/>
            <span>Month</span>
          </label>

          <label class="radio-contribution-interval">
            <input name="radio-contribution-interval" type="radio" id="contributionInterval2" value="Year"/>
            <span>Year</span>
          </label>
        </div>
        
        <div className="buttons-container">
          <Button type="submit">Update</Button>
          <Button type="submit">Create</Button>
          <Button type="submit">Close</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInvestmentForm;