import { useState } from "react";

import "./create-investment-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";

const defaultFormFields = {
  investmentName: "",
  investmentType: "",
  startingAmount: "",
  startDate: "",
  afterYears: "",
  returnRate: "",
  compounded: "",
  additionalContribution: "",
  contributionAt: "",
  contributionInterval: ""
}

const CreateInvestmentForm = ({ label, financeTrackerItemNames }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { investmentName, investmentType, startingAmount, startDate, afterYears, returnRate, 
    compounded, additionalContribution, contributionAt, contributionInterval } = formFields;
    
  const [investments, setInvestments] = useState(financeTrackerItemNames);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    console.log(event.target.value);
  };

  const handleCreateSubmit = (event) => {
    if (investmentName === "" || !investmentName) {
      return;
    }

    event.preventDefault();

    setInvestments([...investments, formFields.investmentName]);

    console.log(formFields.investmentName);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
  };

  return (
    <div className="investment-form-container">
      <FinanceTrackerItems label={ label } financeTrackerItemNames={ investments }></FinanceTrackerItems>
      
      <div className="update-investment-container">

        <h3>Create Investment</h3>

        <form onSubmit={ handleSubmit }>
          <FormInput label="Investment name" type="text" required onChange={ handleChange }
                            name="investmentName" value={ investmentName }></FormInput>
          
          <FormInput label="Investment type" type="text" required onChange={ handleChange }
                            name="investmentType" value={ investmentType }></FormInput>
          
          <FormInput label="Starting amount" type="text" required onChange={ handleChange }
                            name="startingAmount" value={ startingAmount }></FormInput>

          <h5>Start date</h5>
          <FormInput type="date" required name="startDate" value={ startDate }></FormInput>
          
          <FormInput label="After how many years?" type="text" required onChange={ handleChange }
                            name="afterYears" value={ afterYears }></FormInput>
          
          <FormInput label="Return rate" type="text" required onChange={ handleChange }
                            name="returnRate" value={ returnRate }></FormInput>
          
          <div className="compoundedDropdown">
            <button className="dropButton" type="button">Compounded</button>
            <div className="dropdown-content">
              <label value="Annually">Annually</label>
              <label value="Semiannually">Semiannually</label>
              <label value="Quarterly">Quarterly</label>
              <label value="Monthly">Monthly</label>
              <label value="Biweekly">Biweekly</label>
              <label value="Weekly">Weekly</label>
              <label value="Daily">Daily</label>
            </div>
          </div>

          <FormInput label="Additional contribution" type="text" required onChange={ handleChange }
                            name="additionalContribution" value={ additionalContribution }></FormInput>

          <div className="update-investment-contribution-at">
            <h5>Contribution at the</h5>

            <label className="radio-contribution-at">
              <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Beginning"/>
              <span>Beginning</span>
            </label>

            <label className="radio-contribution-at">
              <input name="radio-contribution-at" type="radio" id="contributionAt2" value="End"/>
              <span>End</span>
            </label>
          </div>

          <div className="update-investment-contribution-interval">
            <h5>of each</h5>

            <label className="radio-contribution-interval">
              <input name="radio-contribution-interval" type="radio" checked id="contributionInterval1" value="Month"/>
              <span>Month</span>
            </label>

            <label className="radio-contribution-interval">
              <input name="radio-contribution-interval" type="radio" id="contributionInterval2" value="Year"/>
              <span>Year</span>
            </label>
          </div>
          
          <div className="buttons-container">
            {/* <button className="investment-button-update">Update</button> */}
            <button className="investment-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button>
            {/* <button className="investment-button-close" type="button">Close</button> */}
          </div>
        </form>
      </div>

    </div>
  );
};

export default CreateInvestmentForm;