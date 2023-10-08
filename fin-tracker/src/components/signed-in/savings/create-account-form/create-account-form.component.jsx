import { useState, Component } from "react";

import "./create-account-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";
import InvestmentTrackerItems from "../../../shared/investment-savings-tracker-items/investment-savings-tracker-items.component";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  startDate: "",
  monthlyContribution: "",
  contributionPeriod: "",
  contributionInterval: "",
  apy: ""
}

// const CreateAccountForm = ({ label, financeTrackerItemNames }) => {
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

//   const handleCreateSubmit = (event) => {
//     if (savingsAccountName === "" || !savingsAccountName) {
//       return;
//     }

//     event.preventDefault();

//     setSavingsAccounts([...savingsAccounts, formFields.savingsAccountName]);

//     console.log(formFields.savingsAccountName);
//   }

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormFields({ [name]: value })
//   };

//   return (
//     <div className="update-savings-account-container">
//       <FinanceTrackerItems label={ label } financeTrackerItemNames={ savingsAccounts }></FinanceTrackerItems>

//       <h3>Create Savings Account</h3>

//       <form className="create-savings-account-container" onSubmit={ handleSubmit }>
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
//           {/* <button className="saving-button-update">Update</button> */}
//           <button className="saving-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button>
//           {/* <button className="saving-button-close">Close</button> */}
//         </div>
//       </form>
//     </div>
//   );
// };

class CreateAccountForm extends Component {
  constructor({ label, financeTrackerItemNames }) {
    super();

    this.state = {
      formFields: defaultFormFields,
      label: label,
      savingsAccounts: financeTrackerItemNames,
      savingsAccountsInfo: []
    }
  };

  resetFormFields = () => {
    this.setState({ formFields: defaultFormFields });
  };

  handleSubmit = (event) => {
    // event.preventDefault();

    console.log(event.target.value);
  };

  handleCreateSubmit = (event) => {
    event.preventDefault();

    if (this.state.formFields.savingsAccountName === "" || !this.state.formFields.savingsAccountName ||
      this.state.formFields.initialDeposit === "" || !this.state.formFields.initialDeposit ||
      this.state.formFields.startDate === "" || !this.state.formFields.startDate ||
      this.state.formFields.monthlyContribution === "" || !this.state.formFields.monthlyContribution || 
      this.state.formFields.contributionPeriod === "" || !this.state.formFields.contributionPeriod ||
      this.state.formFields.contributionInterval === "" || !this.state.formFields.contributionInterval ||
      this.state.formFields.apy === "" || !this.state.formFields.apy) {

      console.log('please enter all fields');

      return;
    }
    
    console.log(this.state.formFields);
    this.state.savingsAccounts = [...this.state.savingsAccounts, this.state.formFields.savingsAccountName];
    this.state.savingsAccountsInfo = [...this.state.savingsAccountsInfo, this.state.formFields];

    this.setState({ formFields: defaultFormFields });

    // this.setState({ savingsAccounts: [...this.state.savingsAccounts, this.state.formFields.savingsAccountName] });
    // console.log(this.state.formFields.savingsAccountName);


    console.log(this.state.savingsAccounts);
    console.log(this.state.savingsAccountsInfo);
    console.log(this.state.label);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ formFields: {...this.state.formFields, [name]: value } });
  };

  render() {
    return (
      <div className="update-savings-account-container">
        <InvestmentTrackerItems label={ this.state.label } financeTrackerItemNames={ this.state.savingsAccounts }
                                financeTrackerItemsInfo={ this.state.savingsAccountsInfo }></InvestmentTrackerItems>

        <h3>Create Savings Account</h3>

        <form className="create-savings-account-container" onSubmit={ this.handleSubmit }>
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
            {/* <button className="saving-button-update">Update</button> */}
            <button className="saving-button-create" onClick={ (e) => this.handleCreateSubmit(e) }>Create</button>
            {/* <button className="saving-button-close">Close</button> */}
          </div>
        </form>
      </div>
    )
  };
}

export default CreateAccountForm;