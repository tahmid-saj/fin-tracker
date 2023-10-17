import React, { Component, useState, useContext } from "react";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import FinanceTrackerItems from "../../finance-tracker-items/finance-tracker-items.component";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

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

const CreateAccount = ({ label }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  // const [bankAccounts, setBankAccounts] = useState(financeTrackerItemNames);
  const { bankingAccounts, createBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (handleCreateBankAccount(formFields.bankAccountName) === false) {
    //   console.log("Bank account already exists");
    // }

    // const tmpBankAccounts = [...bankAccounts, formFields.bankAccountName];
    
    // this.setState({ bankAccounts: tmpBankAccounts });
    // setBankAccounts(tmpBankAccounts);

    // this.setState({ formFields: defaultFormFields });

    createBankingAccount(formFields.bankAccountName);
    resetFormFields();

    // console.log(this.state.formFields.bankAccountName);
    console.log(bankingAccounts);
  };
    
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormFields({ [name]: value });
  };

  return (
    <div>
      <FinanceTrackerItems label={ label } 
                          // financeTrackerItemNames={ bankingAccounts }
                          ></FinanceTrackerItems>

      <form onSubmit={ (e) => handleSubmit(e) } className="create-account-container">
        <FormInput label="Account name" type="text" required
                  onChange={ (e) => handleChange(e) }
                  name="bankAccountName" value={ formFields.bankAccountName }></FormInput>

        <div className="buttons-container">
          <Button type="submit">Create Account</Button>
        </div>

      </form>
    </div>
  );
};

class CreateAccountClass extends Component {
  constructor({ label, financeTrackerItemNames, handleCreateBankAccount }) {
    super();
    this.state = {
      label: label,
      bankAccounts: financeTrackerItemNames,
      formFields: defaultFormFields,
      handleCreateBankAccount: handleCreateBankAccount,
    }
  };

  resetFormFields = () => {
    this.setState({ formFields: defaultFormFields });
  };

  // handle addition of bank accounts
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.handleCreateBankAccount(this.state.formFields.bankAccountName) === false) {
      console.log("Bank account already exists");
    }

    const tmpBankAccounts = [...this.state.bankAccounts, this.state.formFields.bankAccountName];

    
    this.setState({ bankAccounts: tmpBankAccounts });
    this.setState({ formFields: defaultFormFields });

    // console.log(this.state.formFields.bankAccountName);
    console.log(this.state.bankAccounts);
  };

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    console.log(this.state.formFields);

    this.setState({ formFields: { bankAccountName: value } });
  };

  render() {
    return (
      <div>
        <FinanceTrackerItems label={ this.state.label } 
                            financeTrackerItemNames={ this.state.bankAccounts }></FinanceTrackerItems>

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