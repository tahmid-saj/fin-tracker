import React, { useState, Component } from "react";

import "./update-investment-form.styles.scss";

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

// const UpdateInvestmentForm = ({ label, financeTrackerItemNames }) => {
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { investmentName, investmentType, startingAmount, startDate, afterYears, returnRate, 
//     compounded, additionalContribution, contributionAt, contributionInterval } = formFields;
    
//   const [investments, setInvestments] = useState(financeTrackerItemNames);

//   const resetFormFields = () => {
//     setFormFields(defaultFormFields);
//   };

//   const handleSubmit = (event) => {
//     // event.preventDefault();

//     console.log(event.target.value);
//   };

//   // const handleCreateSubmit = (event) => {
//   //   if (investmentName === "" || !investmentName) {
//   //     return;
//   //   }

//   //   event.preventDefault();

//   //   setInvestments([...investments, formFields.investmentName]);

//   //   console.log(formFields.investmentName);
//   // }

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormFields({ [name]: value })
//   };

//   return (
//     <div className="investment-form-container">
//       <FinanceTrackerItems label={ label } financeTrackerItemNames={ investments }></FinanceTrackerItems>
      
//       <div className="update-investment-container">

//         <h3>Update Investment</h3>

//         {/* <form> */}
//           <FormInput label="Investment name" type="text" required onChange={ handleChange }
//                             name="investmentName" value={ investmentName }></FormInput>
          
//           <FormInput label="Investment type" type="text" required onChange={ handleChange }
//                             name="investmentType" value={ investmentType }></FormInput>
          
//           <FormInput label="Starting amount" type="text" required onChange={ handleChange }
//                             name="startingAmount" value={ startingAmount }></FormInput>

//           <h5>Start date</h5>
//           <FormInput type="date" required name="startDate" value={ startDate }></FormInput>
          
//           <FormInput label="After how many years?" type="text" required onChange={ handleChange }
//                             name="afterYears" value={ afterYears }></FormInput>
          
//           <FormInput label="Return rate" type="text" required onChange={ handleChange }
//                             name="returnRate" value={ returnRate }></FormInput>
          
//           <div className="compoundedDropdown">
//             <button className="dropButton" type="button">Compounded</button>
//             <div className="dropdown-content">
//               <label value="Annually">Annually</label>
//               <label value="Semiannually">Semiannually</label>
//               <label value="Quarterly">Quarterly</label>
//               <label value="Monthly">Monthly</label>
//               <label value="Biweekly">Biweekly</label>
//               <label value="Weekly">Weekly</label>
//               <label value="Daily">Daily</label>
//             </div>
//           </div>

//           <FormInput label="Additional contribution" type="text" required onChange={ handleChange }
//                             name="additionalContribution" value={ additionalContribution }></FormInput>

//           <label className="contributionAtDropdown" htmlFor="contributionAt">Contribution at the</label>
//           <select className="dropButton" name="contributionAt" id="contributionAt" 
//                   onChange={ handleChange } value={ formFields.contributionAt }>
//             <option value="Beginning">Beginning</option>
//             <option value="End">End</option>
//           </select>

//           <label className="contributionIntervalDropdown" htmlFor="contributionInterval">of each</label>
//           <select className="dropButton" name="contributionInterval" id="contributionInterval" 
//                   onChange={ handleChange } value={ formFields.contributionInterval }>
//             <option value="Month">Month</option>
//             <option value="Year">Year</option>
//           </select>
          
//           <div className="buttons-container">
//             <button className="investment-button-update">Update</button>
//             {/* <button className="investment-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button> */}
//             <button className="investment-button-close" type="button">Close</button>
//           </div>
//         {/* </form> */}
//       </div>

//     </div>
//   );
// };

class UpdateInvestmentForm extends Component {
  constructor({ label, financeTrackerItemNames, closeAccountHandler }) {
    super();

    this.state = {
      formFields: defaultFormFields,
      investments: financeTrackerItemNames,
      label: label,
      investmentsInfo: [],
      closeAccountHandler: closeAccountHandler
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

    this.setState({ formFields: { ...this.state.formFields, [name]: value} });
  };

  handleUpdate = (event) => {

  };

  handleClose = (event) => {
    event.preventDefault();

    this.state.closeAccountHandler();
  };

  render() {
    return (
      <div className="investment-form-container">
        <FinanceTrackerItems label={ this.state.label } 
                            financeTrackerItemNames={ this.state.investments }></FinanceTrackerItems>
        
        <div className="update-investment-container">

          <h3>Update Investment</h3>

          {/* <form> */}
            <FormInput label="Investment name" type="text" required onChange={ this.handleChange }
                              name="investmentName" value={ this.state.formFields.investmentName }></FormInput>
            
            <FormInput label="Investment type" type="text" required onChange={ this.handleChange }
                              name="investmentType" value={ this.state.formFields.investmentType }></FormInput>
            
            <FormInput label="Starting amount" type="text" required onChange={ this.handleChange }
                              name="startingAmount" value={ this.state.formFields.startingAmount }></FormInput>

            <h5>Start date</h5>
            <FormInput type="date" required name="startDate" value={ this.state.formFields.startDate }
                      onChane={ this.handleChange }></FormInput>
            
            <FormInput label="After how many years?" type="text" required onChange={ this.handleChange }
                              name="afterYears" value={ this.state.formFields.afterYears }></FormInput>
            
            <FormInput label="Return rate" type="text" required onChange={ this.handleChange }
                              name="returnRate" value={ this.state.formFields.returnRate }></FormInput>
            
            <label className="compoundedDropdown" htmlFor="compounded">Compounded</label>
            <select className="dropButton" name="compounded" id="compounded" 
                    onChange={ this.handleChange } value={ this.state.formFields.compounded }>
              <option value="Annually">Annually</option>
              <option value="Semiannually">Semiannually</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>

            <FormInput label="Additional contribution" type="text" required onChange={ this.handleChange }
                              name="additionalContribution" value={ this.additionalContribution }></FormInput>

            <label className="contributionAtDropdown" htmlFor="contributionAt">Contribution at the</label>
            <select className="dropButton" name="contributionAt" id="contributionAt" 
                    onChange={ this.handleChange } value={ this.state.formFields.contributionAt }>
              <option value="Beginning">Beginning</option>
              <option value="End">End</option>
            </select>

            <label className="contributionIntervalDropdown" htmlFor="contributionInterval">of each</label>
            <select className="dropButton" name="contributionInterval" id="contributionInterval" 
                    onChange={ this.handleChange } value={ this.state.formFields.contributionInterval }>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select>
            
            <div className="buttons-container">
              <button className="investment-button-update" type="button"
                      onClick={ this.handleUpdate }>Update</button>
              {/* <button className="investment-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button> */}
              <button className="investment-button-close" type="button"
                      onClick={ this.handleClose }>Close</button>
            </div>
          {/* </form> */}
        </div>

      </div>
    );
  }
}

export default UpdateInvestmentForm;