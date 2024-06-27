import { useState, Component, useContext } from "react";

import "./create-account-form.styles.jsx";
import { UpdateSavingsAccountContainer, ContributionInputContainer } from "./create-account-form.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component";

import InvestmentSavingsTrackerItems from "../../investment-savings-tracker-items/investment-savings-tracker-items.component";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useDispatch, useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector";
import { createSavingsAccount } from "../../../../store/signed-out/savings/savings.action";
import { Typography } from "@mui/material";
import { DropButton } from "../../../shared/drop-button/drop-button.styles.jsx";
import Button from "../../../shared/button/button.component.jsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const defaultFormFields = {
  savingsAccountName: "",
  initialDeposit: "",
  startDate: "",
  monthlyContribution: "",
  contributionPeriod: "",
  contributionInterval: "Months",
  apy: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
}

const CreateAccountForm = ({ label }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  // const { createSavingsAccount } = useContext(SavingsContext);
  const dispatch = useDispatch()
  const savingsAccounts = useSelector(selectSavingsAccounts)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
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

    dispatch(createSavingsAccount(savingsAccounts, formFields))
    resetFormFields();

    console.log(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // render() {
    return (
      <UpdateSavingsAccountContainer>
        <SimplePaper styles={ paperStyles }>
          <Typography variant="h6">Track savings</Typography>

          <form onSubmit={ handleSubmit }>
            <div className="container">
              <FormInput label="Savings account name" type="text" required onChange={ handleChange }
                                name="savingsAccountName" value={ formFields.savingsAccountName }></FormInput>
              
              <FormInput label="Initial deposit" type="text" required onChange={ handleChange }
                                name="initialDeposit" value={ formFields.initialDeposit }></FormInput>

              <Typography paragraph>Start date</Typography>
              <FormInput type="date" required name="startDate" value={ formFields.startDate }
                          onChange={ handleChange }></FormInput>
              
              <FormInput label="Monthly contribution" type="text" required onChange={ handleChange }
                                name="monthlyContribution" value={ formFields.monthlyContribution }></FormInput>
              
              <ContributionInputContainer>
                <FormInput label="Over a period of" type="text" required onChange={ handleChange }
                                  name="contributionPeriod" value={ formFields.contributionPeriod }></FormInput>

                <DropButton required className="dropButton" name="contributionInterval" id="contributionInterval" 
                        onChange={ handleChange } value={ formFields.contributionInterval }>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </DropButton>
              </ContributionInputContainer>

              <FormInput label="APY" type="text" required onChange={ handleChange }
                                name="apy" value={ formFields.apy }></FormInput>

              <div className="row">
                <div className="col-12">
                  <div className="btn-group flex-wrap">
                    <Button type="submit">Create</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </SimplePaper>
      </UpdateSavingsAccountContainer>
    )
}

export default CreateAccountForm;