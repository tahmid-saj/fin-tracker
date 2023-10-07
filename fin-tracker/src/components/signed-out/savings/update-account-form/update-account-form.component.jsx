import { useState, Component } from "react";

import "./update-account-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  startDate: "",
  monthlyContribution: "",
  contributionPeriod: "",
  contributionInterval: "",
  apy: ""
}

// const UpdateAccountForm = ({ label, financeTrackerItemNames }) => {
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { savingsAccountName, initialDeposit, startDate, monthlyContribution, 
//     monthlyContributionPeriod, monthlyContributionInterval, apy} = formFields;
    
//   const [savingsAccounts, setSavingsAccounts] = useState(financeTrackerItemNames);

//   const resetFormFields = () => {
//     setFormFields(defaultFormFields);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     console.log(event.target.value);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormFields({ [name]: value })
//   };

//   return (
//     <div className="update-savings-account-container">
//       <h3>Update Savings Account</h3>

//       <FinanceTrackerItems label={ label } financeTrackerItemNames={ savingsAccounts }></FinanceTrackerItems>

//       <form className="update-savings-account-form-container" onSubmit={ handleSubmit }>
//         <FormInput label="Savings account name" type="text" required onChange={ handleChange }
//                           name="savingsAccountName" value={ savingsAccountName }></FormInput>
        
//         <FormInput label="Initial deposit" type="text" required onChange={ handleChange }
//                           name="initialDeposit" value={ initialDeposit }></FormInput>

//         <h5>Start date</h5>
//         <FormInput type="date" required name="startDate" value={ startDate }></FormInput>
        
//         <FormInput label="Monthly contribution" type="text" required onChange={ handleChange }
//                           name="monthlyContribution" value={ monthlyContribution }></FormInput>
        
//         <FormInput label="Over a period of" type="text" required onChange={ handleChange }
//                           name="monthlyContributionPeriod" value={ monthlyContributionPeriod }></FormInput>
        
//         <div className="update-savings-account-contribution-at">
//           <label className="radio-contribution-at">
//             <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Months"/>
//             <span>Months</span>
//           </label>

//           <label className="radio-contribution-at">
//             <input name="radio-contribution-at" type="radio" id="contributionAt2" value="Years"/>
//             <span>Years</span>
//           </label>
//         </div>

//         <FormInput label="APY" type="text" required onChange={ handleChange }
//                           name="apy" value={ apy }></FormInput>
        
//         <div className="buttons-container">
//           <button className="saving-button-update">Update</button>
//           {/* <button className="saving-button-create">Create</button> */}
//           <button className="saving-button-close">Close</button>
//         </div>
//       </form>
//     </div>
//   );
// };

class UpdateAccountForm extends Component {
  constructor({ label, financeTrackerItemNames, closeAccountHandler, 
                updateSavingsAccountHandler, handleTrackerItemNameChange }) {
    super();

    this.state = {
      formFields: defaultFormFields,
      savingsAccounts: financeTrackerItemNames,
      label: label,
      savingsAccountsInfo: [],
      closeAccountHandler: closeAccountHandler,
      updateSavingsAccountHandler: updateSavingsAccountHandler,
      handleTrackerItemNameChange: handleTrackerItemNameChange
    }
  };

  resetFormFields = () => {
    this.setState({ formFields: defaultFormFields });
  };

  handleSubmit = (event) => {
    // event.preventDefault();

    console.log(event.target.value);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ formFields: { ...this.state.formFields, [name]: value } });
  };

  handleUpdate = (event) => {
    event.preventDefault();

    if (this.state.formFields.savingsAccountName === "" || !this.state.formFields.savingsAccountName ||
      this.state.formFields.initialDeposit === "" || !this.state.formFields.initialDeposit ||
      this.state.startDate === "" || !this.state.startDate ||
      this.state.formFields.monthlyContribution === "" || !this.state.formFields.monthlyContribution || 
      this.state.contributionPeriod === "" || !this.state.contributionPeriod ||
      this.state.contributionInterval === "" || !this.state.contributionInterval ||
      this.state.apy === "" || !this.state.apy) {

      console.log('please enter all fields');

      return;
    }

    this.state.savingsAccountsInfo = [...this.state.savingsAccountsInfo, this.state.formFields];

    this.state.updateSavingsAccountHandler(this.state.formFields);
    this.state.handleTrackerItemNameChange(this.state.formFields.savingsAccountName);

    this.setState({ formFields: defaultFormFields });
  };

  handleClose = (event) => {
    event.preventDefault();

    this.state.closeAccountHandler();
  }

  render() {
    return (
      <div className="update-savings-account-container">
        <h3>Update Savings Account</h3>

        {/* <FinanceTrackerItems label={ this.state.label } financeTrackerItemNames={ this.state.savingsAccounts }
                              ></FinanceTrackerItems> */}

        <form className="update-savings-account-form-container" onSubmit={ this.handleSubmit }>
          <FormInput label="Savings account name" type="text" required onChange={ this.handleChange }
                            name="savingsAccountName" value={ this.state.formFields.savingsAccountName }></FormInput>
          
          <FormInput label="Initial deposit" type="text" required onChange={ this.handleChange }
                            name="initialDeposit" value={ this.state.formFields.initialDeposit }></FormInput>

          <h5>Start date</h5>
          <FormInput type="date" required name="startDate" value={ this.state.formFields.startDate }
                            onChange={ this.handleChange }></FormInput>
          
          <FormInput label="Monthly contribution" type="text" required onChange={ this.handleChange }
                            name="monthlyContribution" value={ this.state.formFields.monthlyContribution }></FormInput>
          
          <div className="contribution-interval-container">
            <FormInput label="Over a period of" type="text" required onChange={ this.handleChange }
                              name="contributionPeriod" value={ this.state.formFields.contributionPeriod }></FormInput>
            
            {/* <div className="update-savings-account-contribution-at">
              <label className="radio-contribution-at">
                <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Months"/>
                <span>Months</span>
              </label>

              <label className="radio-contribution-at">
                <input name="radio-contribution-at" type="radio" id="contributionAt2" value="Years"/>
                <span>Years</span>
              </label>
            </div> */}

            <select className="dropButton" name="contributionInterval" id="contributionInterval" 
                    onChange={ this.handleChange } value={ this.state.formFields.contributionInterval }>
              <option value="Month">Months</option>
              <option value="Year">Years</option>
            </select>
          </div>

          <FormInput label="APY" type="text" required onChange={ this.handleChange }
                            name="apy" value={ this.state.formFields.apy }></FormInput>
          
          <div className="buttons-container">
            <button className="saving-button-update" type="button"
                    onClick={ this.handleUpdate }>Update</button>
            {/* <button className="saving-button-create">Create</button> */}
            <button className="saving-button-close" type="button"
                    onClick={ this.handleClose }>Close</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateAccountForm;