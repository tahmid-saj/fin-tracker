import React, { useState, Component, useContext } from "react";

import "./create-investment-form.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
// import Button from "../../../shared/button/button.component";
// import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";
import InvestmentSavingsTrackerItems from "../../investment-savings-tracker-items/investment-savings-tracker-items.component";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

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

// const CreateInvestmentForm = ({ label, financeTrackerItemNames }) => {
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { investmentName, investmentType, startingAmount, startDate, afterYears, returnRate, 
//     compounded, additionalContribution, contributionAt, contributionInterval } = formFields;
    
//   const [investments, setInvestments] = useState(financeTrackerItemNames);
//   const [investmentsInfo, setInvestmentsInfo] = useState([]);

//   const resetFormFields = () => {
//     setFormFields(defaultFormFields);
//   };

//   const handleSubmit = (event) => {
//     // event.preventDefault();

//     console.log(event.target.value);
//   };

//   const handleCreateSubmit = (event) => {
//     event.preventDefault();
    
//     // if (formFields.investmentName === "" || !formFields.investmentName || formFields.investmentType === "" || !formFields.investmentType ||
//     // formFields.startingAmount === "" || !formFields.startingAmount ||
//     // formFields.startDate === "" || !formFields.startDate || formFields.afterYears === "" || !formFields.afterYears ||
//     // formFields.returnRate === "" || !formFields.returnRate || formFields.compounded === "" || !formFields.compounded ||
//     // formFields.additionalContribution === "" || !formFields.additionalContribution || formFields.contributionAt === "" || !formFields.contributionAt ||
//     // formFields.contributionInterval === "" || !formFields.contributionInterval) {
      
//     //   console.log("pleaee fill out all info");
//     //   return;
//     // }

//     console.log(investments);
//     console.log(investmentsInfo);
//     console.log(formFields);

//     setFormFields({ formFields });
//     // investments.length === 0 && setInvestments([formFields.investmentName]);
//     setInvestments([...investments, formFields.investmentName]);
    
//     // investments.push(formFields.investmentName);
//     investmentsInfo.length === 0 && setInvestmentsInfo([formFields]);
//     investmentsInfo.length !== 0 && setInvestmentsInfo([...investmentsInfo, formFields]);
//     // investmentsInfo.push(formFields);
    
//     console.log(investments);
//     console.log(investmentsInfo);
//     console.log(formFields);
//   }

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormFields({ ...formFields, [name]: value });

//     console.log(name, value);
//     console.log(formFields);
//   };

//   return (
//     <div className="investment-form-container">
//       <FinanceTrackerItems label={ label } financeTrackerItemNames={ investments }
//                             financeTrackerItemsInfo={ investmentsInfo }></FinanceTrackerItems>
      
//       <div className="update-investment-container">

//         <h3>Create Investment</h3>

//         <form onSubmit={ handleSubmit }>
//           <FormInput label="Investment name" type="text" required onChange={ handleChange }
//                             name="investmentName" value={ investmentName }></FormInput>
          
//           <FormInput label="Investment type" type="text" required onChange={ handleChange }
//                             name="investmentType" value={ investmentType }></FormInput>
          
//           <FormInput label="Starting amount" type="text" required onChange={ handleChange }
//                             name="startingAmount" value={ startingAmount }></FormInput>

//           <h5>Start date</h5>
//           <FormInput type="date" required name="startDate" value={ startDate } onChange={ handleChange }></FormInput>
          
//           <FormInput label="After how many years?" type="text" required onChange={ handleChange }
//                             name="afterYears" value={ afterYears }></FormInput>
          
//           <FormInput label="Return rate" type="text" required onChange={ handleChange }
//                             name="returnRate" value={ returnRate }></FormInput>
          
//           {/* <div class="compoundedDropdown">
//             <button class="dropButton" type="button" onChange={ handleChange } value={ compounded }>Compounded</button>
//             <div class="dropdown-content">
//               <label value="Annually">Annually</label>
//               <label value="Semiannually">Semiannually</label>
//               <label value="Quarterly">Quarterly</label>
//               <label value="Monthly">Monthly</label>
//               <label value="Biweekly">Biweekly</label>
//               <label value="Weekly">Weekly</label>
//               <label value="Daily">Daily</label>
//             </div>
//           </div> */}

//           <label className="compoundedDropdown" htmlFor="compounded">Compounded</label>
//           <select className="dropButton" name="compounded" id="compounded" onChange={ handleChange } value={ compounded }>
//             <option value="Annually">Annually</option>
//             <option value="Semiannually">Semiannually</option>
//             <option value="Quarterly">Quarterly</option>
//             <option value="Monthly">Monthly</option>
//             <option value="Biweekly">Biweekly</option>
//             <option value="Weekly">Weekly</option>
//             <option value="Daily">Daily</option>
//           </select>

//           <FormInput label="Additional contribution" type="text" required onChange={ handleChange }
//                             name="additionalContribution" value={ additionalContribution }></FormInput>

//           {/* <div className="update-investment-contribution-at" onChange={ handleChange }>
//             <h5>Contribution at the</h5>

//             <label className="radio-contribution-at">
//               <input name="radio-contribution-at" type="radio" checked id="contributionAt1" value="Beginning"
//                 onClick={ handleChange }
//               />
//               <span>Beginning</span>
//             </label>

//             <label className="radio-contribution-at">
//               <input name="radio-contribution-at" type="radio" id="contributionAt2" value="End"
//                 onClick={ handleChange }
//               />
//               <span>End</span>
//             </label>
//           </div> */}

//           <label className="contributionAtDropdown" htmlFor="contributionAt">Contribution at the</label>
//           <select className="dropButton" name="contributionAt" id="contributionAt" onChange={ handleChange } value={ contributionAt }>
//             <option value="Beginning">Beginning</option>
//             <option value="End">End</option>
//           </select>

//           {/* <div className="update-investment-contribution-interval">
//             <h5>of each</h5>

//             <label className="radio-contribution-interval">
//               <input name="radio-contribution-interval" type="radio" checked id="contributionInterval1" value="Month"
//                 onClick={ handleChange }
//               />
//               <span>Month</span>
//             </label>

//             <label className="radio-contribution-interval">
//               <input name="radio-contribution-interval" type="radio" id="contributionInterval2" value="Year"
//                 onClick={ handleChange }
//               />
//               <span>Year</span>
//             </label>
//           </div> */}

//           <label className="contributionIntervalDropdown" htmlFor="contributionInterval">of each</label>
//           <select className="dropButton" name="contributionInterval" id="contributionInterval" onChange={ handleChange } value={ contributionInterval }>
//             <option value="Month">Month</option>
//             <option value="Year">Year</option>
//           </select>
          
//           <div className="buttons-container">
//             {/* <button className="investment-button-update">Update</button> */}
//             <button className="investment-button-create" onClick={ (e) => handleCreateSubmit(e) }>Create</button>
//             {/* <button className="investment-button-close" type="button">Close</button> */}
//           </div>
//         </form>
//       </div>

//     </div>
//   );
// };

const CreateInvestmentForm = ({ label }) => {
  // constructor({ label }) {
  //   super();

  //   this.state = {
  //     formFields: defaultFormFields,
  //     label: label,
  //     investments: financeTrackerItemNames,
  //     investmentsInfo: []
  //   };
  // }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { createInvestment } = useContext(InvestmentsContext);

  const resetFormFields = () => {
    // this.setState({ formFields: defaultFormFields });
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

  // handleCreateSubmit = (event) => {
  //   event.preventDefault();

  //   if (this.state.formFields.investmentName === "" || !this.state.formFields.investmentName || this.state.formFields.investmentType === "" || !this.state.formFields.investmentType ||
  //     this.state.formFields.startingAmount === "" || !this.state.formFields.startingAmount ||
  //     this.state.formFields.startDate === "" || !this.state.formFields.startDate || this.state.formFields.afterYears === "" || !this.state.formFields.afterYears ||
  //     this.state.formFields.returnRate === "" || !this.state.formFields.returnRate || this.state.formFields.compounded === "" || !this.state.formFields.compounded ||
  //     this.state.formFields.additionalContribution === "" || !this.state.formFields.additionalContribution || this.state.formFields.contributionAt === "" || !this.state.formFields.contributionAt ||
  //     this.state.formFields.contributionInterval === "" || !this.state.formFields.contributionInterval) {
  
  //     console.log("pleaee fill out all info");
  //     return;
  //   }

  //   this.state.investments = [...this.state.investments, this.state.formFields.investmentName];
  //   this.state.investmentsInfo = [...this.state.investmentsInfo, this.state.formFields];
    
  //   this.setState({ formFields: defaultFormFields });
  //   // this.setState({ investments: [...this.state.investments, this.state.formFields.investmentName] });
  //   // this.setState({ investmentsInfo: [...this.state.investmentsInfo, this.state.formFields] });

  //   console.log(this.state.investments);
  //   console.log(this.state.investmentsInfo);
  //   console.log(this.state.label);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    // this.setState({ formFields: {...this.state.formFields, [name]: value } });
  };

  // render() {
  return (
    <div className="investment-form-container">
      <InvestmentSavingsTrackerItems label={ label } 
                                    // financeTrackerItemNames={ this.state.investments }
                                    // financeTrackerItemsInfo={ this.state.investmentsInfo }
                    ></InvestmentSavingsTrackerItems>

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
              {/* <button className="investment-button-update">Update</button> */}
              <button className="investment-button-create" type="submit" 
                      // onClick={ this.handleCreateSubmit }
                      >Create</button>
              {/* <button className="investment-button-close" type="button">Close</button> */}
            </div>

          </form>
        </div>
    </div>
  )
  // }
};

class CreateInvestmentForm2 extends Component {
  constructor({ label, financeTrackerItemNames }) {
    super();

    this.state = {
      formFields: defaultFormFields,
      label: label,
      investments: financeTrackerItemNames,
      investmentsInfo: []
    };
  }

  resetFormFields = () => {
    this.setState({ formFields: defaultFormFields });
  };

  handleSubmit = (event) => {
    // event.preventDefault();

    console.log(event.target.value);
  };

  handleCreateSubmit = (event) => {
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

    this.state.investments = [...this.state.investments, this.state.formFields.investmentName];
    this.state.investmentsInfo = [...this.state.investmentsInfo, this.state.formFields];
    
    this.setState({ formFields: defaultFormFields });
    // this.setState({ investments: [...this.state.investments, this.state.formFields.investmentName] });
    // this.setState({ investmentsInfo: [...this.state.investmentsInfo, this.state.formFields] });

    console.log(this.state.investments);
    console.log(this.state.investmentsInfo);
    console.log(this.state.label);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ formFields: {...this.state.formFields, [name]: value } });
  };

  render() {
    return (
      <div className="investment-form-container">
        <InvestmentSavingsTrackerItems label={ this.state.label } financeTrackerItemNames={ this.state.investments }
                      financeTrackerItemsInfo={ this.state.investmentsInfo }></InvestmentSavingsTrackerItems>

          <div className="update-investment-container">
            <h3>Create Investment</h3>

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
                {/* <button className="investment-button-update">Update</button> */}
                <button className="investment-button-create" type="submit" 
                        onClick={ this.handleCreateSubmit }>Create</button>
                {/* <button className="investment-button-close" type="button">Close</button> */}
              </div>

            </form>
          </div>
      </div>
    )
  }
};

export default CreateInvestmentForm;