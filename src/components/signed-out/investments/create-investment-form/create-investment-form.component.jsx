import React, { useState, Component, useContext } from "react";

import "./create-investment-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";

import InvestmentSavingsTrackerItems from "../../investment-savings-tracker-items/investment-savings-tracker-items.component";

import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";

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

const defaultInvestmentsInfo = [
  {
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
]

const CreateInvestmentForm = ({ label }) => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { createInvestment } = useContext(InvestmentsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formFields.investmentName === "" || !formFields.investmentName || formFields.investmentType === "" || !formFields.investmentType ||
      formFields.startingAmount === "" || !formFields.startingAmount ||
      formFields.startDate === "" || !formFields.startDate || formFields.afterYears === "" || !formFields.afterYears ||
      formFields.returnRate === "" || !formFields.returnRate || formFields.compounded === "" || !formFields.compounded ||
      formFields.additionalContribution === "" || !formFields.additionalContribution || formFields.contributionAt === "" || !formFields.contributionAt ||
      formFields.contributionInterval === "" || !formFields.contributionInterval) {

      console.log("pleaee fill out all info");
      return;
    }

    createInvestment(formFields);
    resetFormFields();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="investment-form-container">
      <InvestmentSavingsTrackerItems label={ label }></InvestmentSavingsTrackerItems>

        <div className="update-investment-container">
          <h3>Create Investment</h3>

          <form onSubmit={ handleSubmit }>
            <FormInput label="Investment name" type="text" required onChange={ handleChange }
                            name="investmentName" value={ formFields.investmentName }></FormInput>
          
            <FormInput label="Investment type" type="text" required onChange={ handleChange }
                              name="investmentType" value={ formFields.investmentType }></FormInput>
            
            <FormInput label="Starting amount" type="text" required onChange={ handleChange }
                              name="startingAmount" value={ formFields.startingAmount }></FormInput>

            <h5>Start date</h5>

            <FormInput type="date" required name="startDate" value={ formFields.startDate } 
                        onChange={ handleChange }></FormInput>
            
            <FormInput label="After how many years?" type="text" required onChange={ handleChange }
                              name="afterYears" value={ formFields.afterYears }></FormInput>
            
            <FormInput label="Return rate (%)" type="text" required onChange={ handleChange }
                              name="returnRate" value={ formFields.returnRate }></FormInput>

            <label className="compoundedDropdown" htmlFor="compounded">Compounded</label>

            <select className="dropButton" name="compounded" id="compounded" 
                    onChange={ handleChange } value={ formFields.compounded }>

              <option value="Annually">Annually</option>
              <option value="Semiannually">Semiannually</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>

            <FormInput label="Additional contribution" type="text" required onChange={ handleChange }
                          name="additionalContribution" value={ formFields.additionalContribution }></FormInput>

            <label className="contributionAtDropdown" htmlFor="contributionAt">Contribution at the</label>
            <select className="dropButton" name="contributionAt" id="contributionAt" 
                    onChange={ handleChange } value={ formFields.contributionAt }>

              <option value="Beginning">Beginning</option>
              <option value="End">End</option>
            </select>

            <label className="contributionIntervalDropdown" htmlFor="contributionInterval">of each</label>
            <select className="dropButton" name="contributionInterval" id="contributionInterval" 
                    onChange={ handleChange } value={ formFields.contributionInterval }>

              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select>

            <div className="buttons-container">
              <button className="investment-button-create" type="submit">Create</button>
            </div>

          </form>
        </div>
    </div>
  )
};

export default CreateInvestmentForm;