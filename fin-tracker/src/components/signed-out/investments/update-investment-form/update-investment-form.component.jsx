import React, { useState, Component, useContext } from "react";

import "./update-investment-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";

import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";

import { INVESTMENT_CONFIRM_CLOSE } from "../../../../utils/constants/investments.constants";

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

const UpdateInvestmentForm = ({ label, financeItemInfo }) => {
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const { updateInvestment, closeInvestment } = useContext(InvestmentsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (formFields.investmentName === "" || !formFields.investmentName || formFields.investmentType === "" || 
      !formFields.investmentType || formFields.startingAmount === "" || !formFields.startingAmount ||
      formFields.startDate === "" || !formFields.startDate || formFields.afterYears === "" || 
      !formFields.afterYears || formFields.returnRate === "" || !formFields.returnRate || 
      formFields.compounded === "" || !formFields.compounded || formFields.additionalContribution === "" || 
      !formFields.additionalContribution || formFields.contributionAt === "" || !formFields.contributionAt ||
      formFields.contributionInterval === "" || !formFields.contributionInterval) {
  
      console.log("pleaee fill out all info");
      return;
    }

    updateInvestment(financeItemInfo.investmentName, formFields)
    resetFormFields();
  };

  const handleClose = (event) => {
    event.preventDefault();
    setShowConfirmClose(true);
  };
  
  const handleConfirmClose = (event, confirmClose) => {
    event.preventDefault();
    setShowConfirmClose(false);

    if (confirmClose === INVESTMENT_CONFIRM_CLOSE.yes) {
      closeInvestment(financeItemInfo.investmentName);
    }
  };

  return (
    <div className="investment-form-container">
      
      <div className="update-investment-container">

        <h3>Update Investment</h3>

        <form>
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
            <button className="investment-button-update" type="button"
                    onClick={ handleUpdate }>Update</button>

            <button className="investment-button-close" type="button"
                    onClick={ handleClose }>Close</button>
          </div>

          {
            showConfirmClose === true &&
            <div className="buttons-container">
              <h3>Are you sure you want to close the investment?</h3>

              <button className="investment-confirm-close-button" type="button"
                      onClick={ (event) => handleConfirmClose(event, INVESTMENT_CONFIRM_CLOSE.yes) }>Yes</button>
              
              <button className="investment-confirm-close-button" type="button"
                      onClick={ (event) => handleConfirmClose(event, INVESTMENT_CONFIRM_CLOSE.no) }>No</button>
            </div>
          }
        </form>
      </div>

    </div>
  );
}

export default UpdateInvestmentForm;