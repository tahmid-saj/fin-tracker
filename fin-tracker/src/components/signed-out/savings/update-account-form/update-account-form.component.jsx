import { useState, Component, useContext } from "react";

import "./update-account-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";

import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";

import { SAVINGS_CONFIRM_CLOSE } from "../../../../utils/constants/savings.constants";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  startDate: "",
  monthlyContribution: "",
  contributionPeriod: "",
  contributionInterval: "Months",
  apy: ""
}

const UpdateAccountForm = ({ label, financeItemInfo }) => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const { updateSavingsAccount, closeSavingsAccount } = useContext(SavingsContext);

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

    updateSavingsAccount(financeItemInfo.savingsAccountName, formFields);
    resetFormFields();
  };

  const handleClose = (event) => {
    event.preventDefault();
    setShowConfirmClose(true);
  };
  
  const handleConfirmClose = (event, confirmClose) => {
    event.preventDefault();
    setShowConfirmClose(false);
    
    if (confirmClose === SAVINGS_CONFIRM_CLOSE.yes) {
      closeSavingsAccount(financeItemInfo.savingsAccountName);
    }
  };

  return (
    <div className="update-savings-account-container">
      <h3>Update savings</h3>

      <form className="update-savings-account-form-container">
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
          <button className="saving-button-update" type="button"
                  onClick={ handleUpdate }>Update</button>

          <button className="saving-button-close" type="button"
                  onClick={ handleClose }>Close</button>
        </div>

        {
          showConfirmClose === true &&
          <div className="buttons-container">
            <h3>Sure you want to close the savings account?</h3>

            <button className="saving-button-confirm-close" type="button"
                    onClick={ (event) => handleConfirmClose(event, SAVINGS_CONFIRM_CLOSE.yes) }>Yes</button>
            <button className="saving-button-confirm-close" type="button"
                    onClick={ (event) => handleConfirmClose(event, SAVINGS_CONFIRM_CLOSE.no) }>No</button>
          </div>
        }
      </form>
    </div>
  );
}

export default UpdateAccountForm;