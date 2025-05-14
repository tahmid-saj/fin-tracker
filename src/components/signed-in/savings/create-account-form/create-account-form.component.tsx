import { useState, Component, useContext, FormEvent, ChangeEvent } from "react";

import "./create-account-form.styles.tsx";
import { CreateSavingsAccountContainer, ContributionInputContainer } from "./create-account-form.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context.tsx";
import { Typography } from "@mui/material";
import { DropButton } from "../../../shared/drop-button/drop-button.styles.tsx";
import Button from "../../../shared/button/button.component.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";

type FormFields = {
  savingsAccountName: string,
  initialDeposit: string,
  startDate: string,
  monthlyContribution: string,
  contributionPeriod: string,
  contributionInterval: string,
  apy: string
}

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

const CreateAccountForm = () => {

  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { createSavingsAccount } = useContext(SavingsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formFields.savingsAccountName === "" || !formFields.savingsAccountName ||
      formFields.initialDeposit === "" || !formFields.initialDeposit ||
      formFields.startDate === "" || !formFields.startDate ||
      formFields.monthlyContribution === "" || !formFields.monthlyContribution || 
      formFields.contributionPeriod === "" || !formFields.contributionPeriod ||
      formFields.contributionInterval === "" || !formFields.contributionInterval ||
      formFields.apy === "" || !formFields.apy) {

      

      return;
    }

    createSavingsAccount({
      savingsAccountName: formFields.savingsAccountName,
      initialDeposit: Number(formFields.initialDeposit),
      startDate: formFields.startDate,
      monthlyContribution: Number(formFields.monthlyContribution),
      contributionPeriod: Number(formFields.contributionPeriod),
      contributionInterval: formFields.contributionInterval,
      apy: Number(formFields.apy),

      totalSavings: 0,
      totalContribution: 0,
      totalInterest: 0,

      savings: []
    });
    resetFormFields();

    
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

    return (
      <CreateSavingsAccountContainer>
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
      </CreateSavingsAccountContainer>
    )
}

export default CreateAccountForm;