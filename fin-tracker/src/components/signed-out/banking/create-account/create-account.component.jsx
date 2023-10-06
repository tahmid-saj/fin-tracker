import React, { Component, useState } from "react";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import FinanceTrackerItems from "../../../shared/finance-tracker-items/finance-tracker-items.component";

import "./create-account.styles.scss";

const defaultFormFields = {
  bankAccountName: ""
};

// const CreateAccount = ({ label, financeTrackerItemNames }) => {
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const [bankAccounts, setBankAccounts] = useState(financeTrackerItemNames);

//   // const { bankAccountName } = formFields;
  
//   const resetFormFields = () => {
//     setFormFields(defaultFormFields);
//   };
  
//   // handling addition of bank accounts
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     setBankAccounts([...bankAccounts, formFields.bankAccountName]);

//     console.log(formFields.bankAccountName);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormFields({ [name]: value })
//   };

//   return (
//     <div>
//       <FinanceTrackerItems label={ label } financeTrackerItemNames={ bankAccounts }></FinanceTrackerItems>

//       <form onSubmit={ e => handleSubmit(e) } className="create-account-container">
//         <FormInput label="Account name" type="text" required 
//                     onChange={ e => handleChange(e) }
//                     name="bankAccountName" value={ bankAccountName }></FormInput>

//         <div className="buttons-container">
//           <Button type="submit">Create Account</Button>
//         </div>
//       </form>

//     </div>
//   );
// };

class CreateAccount extends Component {
  constructor({ label, financeTrackerItemNames }) {
    super();
    this.state = {
      label: label,
      bankAccounts: financeTrackerItemNames,
      formFields: defaultFormFields,
    }
  };

  resetFormFields = () => {
    this.setState({ formFields: defaultFormFields });
  };

  // handle addition of bank accounts
  handleSubmit = (event) => {
    event.preventDefault();
    
    this.setState({ bankAccounts: [...this.state.bankAccounts, this.state.formFields.bankAccountName] })

    console.log(this.state.formFields.bankAccountName);
  };

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    this.setState({ formFields: { name: value } });
  };

  render() {
    return (
      <div>
        <FinanceTrackerItems label={ this.state.label } financeTrackerItemNames={ this.state.bankAccounts }></FinanceTrackerItems>

        <form onSubmit={ (e) => this.handleSubmit(e) } className="create-account-container">
          <FormInput label="Account name" type="text" required
                    onChange={ (e) => this.handleChange(e) }
                    name="bankAccountName" value={ this.state.formFields.bankAccountName }></FormInput>

          <div className="buttons-container">
            <Button type="submit">Create Account</Button>
          </div>

        </form>
      </div>
    )
  }
}

export default CreateAccount;