import React, { useState, Component, useContext } from "react";

import "./update-investment-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";
import InvestmentTrackerItems from "../../../shared/investment-savings-tracker-items/investment-savings-tracker-items.component";

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

const UpdateInvestmentForm = ({ label, financeItemInfo }) => {
  // constructor({ label, financeTrackerItemNames, closeAccountHandler, 
  //               updateInvestmentInfoHandler, handleTrackerItemNameChange }) {
  //   super();

  //   this.state = {
  //     formFields: defaultFormFields,
  //     investments: financeTrackerItemNames,
  //     label: label,
  //     investmentsInfo: [],
  //     closeAccountHandler: closeAccountHandler,
  //     updateInvestmentInfoHandler: updateInvestmentInfoHandler,
  //     handleTrackerItemNameChange: handleTrackerItemNameChange
  //   }
  // };
  
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { updateInvestment, closeInvestment } = useContext(InvestmentsContext);

  const resetFormFields = () => {
    // this.setState({ formFields: defaultFormFields });
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // this.setState({ formFields: { ...this.state.formFields, [name]: value} });
    setFormFields({ ...formFields, [name]: value });
  };

  const handleUpdate = (event) => {
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

    // this.state.investments = [...this.state.investments, this.state.formFields.investmentName];
    // this.state.investmentsInfo = [...this.state.investmentsInfo, this.state.formFields];
    
    // this.state.updateInvestmentInfoHandler(this.state.formFields);
    // this.state.handleTrackerItemNameChange(this.state.formFields.investmentName);

    // this.setState({ formFields: defaultFormFields });

    updateInvestment(financeItemInfo.investmentName, formFields)
    resetFormFields();
  };

  const handleClose = (event) => {
    event.preventDefault();
    
    // this.state.closeAccountHandler();
    closeInvestment(financeItemInfo.investmentName);
  };

  // render() {
  return (
    <div className="investment-form-container">
      {/* <InvestmentTrackerItems label={ this.state.label } financeTrackerItemNames={ this.state.investments }
                            financeTrackerItemsInfo={ this.state.investmentsInfo }></InvestmentTrackerItems> */}
      
      <div className="update-investment-container">

        <h3>Update Investment</h3>

        <form 
          // onSubmit={ this.handleSubmit }
          >
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

            {/* <button className="investment-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button> */}
            <button className="investment-button-close" type="button"
                    onClick={ handleClose }>Close</button>
          </div>
        </form>
      </div>

    </div>
  );
  // }
}

class UpdateInvestmentForm2 extends Component {
  constructor({ label, financeTrackerItemNames, closeAccountHandler, 
                updateInvestmentInfoHandler, handleTrackerItemNameChange }) {
    super();

    this.state = {
      formFields: defaultFormFields,
      investments: financeTrackerItemNames,
      label: label,
      investmentsInfo: [],
      closeAccountHandler: closeAccountHandler,
      updateInvestmentInfoHandler: updateInvestmentInfoHandler,
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

    this.setState({ formFields: { ...this.state.formFields, [name]: value} });
  };

  handleUpdate = (event) => {
    event.preventDefault();

    if (this.state.formFields.investmentName === "" || !this.state.formFields.investmentName || this.state.formFields.investmentType === "" || !this.state.formFields.investmentType ||
      this.state.formFields.startingAmount === "" || !this.state.formFields.startingAmount ||
      this.state.formFields.startDate === "" || !this.state.formFields.startDate || this.state.formFields.afterYears === "" || !this.state.formFields.afterYears ||
      this.state.formFields.returnRate === "" || !this.state.formFields.returnRate || this.state.formFields.compounded === "" || !this.state.formFields.compounded ||
      this.state.formFields.additionalContribution === "" || !this.state.formFields.additionalContribution || this.state.formFields.contributionAt === "" || !this.state.formFields.contributionAt ||
      this.state.formFields.contributionInterval === "" || !this.state.formFields.contributionInterval) {
  
      console.log("pleaee fill out all info");
      return;
    }

    // this.state.investments = [...this.state.investments, this.state.formFields.investmentName];
    this.state.investmentsInfo = [...this.state.investmentsInfo, this.state.formFields];
    
    this.state.updateInvestmentInfoHandler(this.state.formFields);
    this.state.handleTrackerItemNameChange(this.state.formFields.investmentName);

    this.setState({ formFields: defaultFormFields });
  };

  handleClose = (event) => {
    event.preventDefault();

    this.state.closeAccountHandler();
  };

  render() {
    return (
      <div className="investment-form-container">
        {/* <InvestmentTrackerItems label={ this.state.label } financeTrackerItemNames={ this.state.investments }
                              financeTrackerItemsInfo={ this.state.investmentsInfo }></InvestmentTrackerItems> */}
        
        <div className="update-investment-container">

          <h3>Update Investment</h3>

          <form onSubmit={ this.handleSubmit }>
            <FormInput label="Investment name" type="text" required onChange={ this.handleChange }
                              name="investmentName" value={ this.state.formFields.investmentName }></FormInput>
            
            <FormInput label="Investment type" type="text" required onChange={ this.handleChange }
                              name="investmentType" value={ this.state.formFields.investmentType }></FormInput>
            
            <FormInput label="Starting amount" type="text" required onChange={ this.handleChange }
                              name="startingAmount" value={ this.state.formFields.startingAmount }></FormInput>

            <h5>Start date</h5>
            <FormInput type="date" required name="startDate" value={ this.state.formFields.startDate }
                      onChange={ this.handleChange }></FormInput>
            
            <FormInput label="After how many years?" type="text" required onChange={ this.handleChange }
                              name="afterYears" value={ this.state.formFields.afterYears }></FormInput>
            
            <FormInput label="Return rate (%)" type="text" required onChange={ this.handleChange }
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
                              name="additionalContribution" value={ this.state.formFields.additionalContribution }></FormInput>

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
          </form>
        </div>

      </div>
    );
  }
}

export default UpdateInvestmentForm;