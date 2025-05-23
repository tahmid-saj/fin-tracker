import { useState, Component, useContext, MouseEvent } from "react";

import "./update-account-form.styles.tsx";
import { UpdateSavingsAccountContainer, ContributionInputContainer } from "./update-account-form.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";

import { SavingsContext } from "../../../../contexts/signed-in/savings/savings.context.tsx";

import { SAVINGS_CONFIRM_CLOSE } from "../../../../utils/constants/savings.constants.ts";
import { Typography } from "@mui/material";
import Button from "../../../shared/button/button.component.tsx";
import { DropButton } from "../../../shared/drop-button/drop-button.styles.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { SavingsAccount } from "../../../../contexts/signed-in/savings/savings.types.ts";

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
  contributionInterval: "",
  apy: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
}

const UpdateAccountForm = ({ financeItemInfo }: { financeItemInfo: SavingsAccount }) => {

  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const { updateSavingsAccount, closeSavingsAccount } = useContext(SavingsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // const handleUpdate = (event) => {
  //   event.preventDefault();

  //   if (formFields.savingsAccountName === "" || !formFields.savingsAccountName ||
  //     formFields.initialDeposit === "" || !formFields.initialDeposit ||
  //     formFields.startDate === "" || !formFields.startDate ||
  //     formFields.monthlyContribution === "" || !formFields.monthlyContribution || 
  //     formFields.contributionPeriod === "" || !formFields.contributionPeriod ||
  //     formFields.contributionInterval === "" || !formFields.contributionInterval ||
  //     formFields.apy === "" || !formFields.apy) {

      

  //     return;
  //   }

  //   updateSavingsAccount(financeItemInfo.savingsAccountName, formFields);
  //   resetFormFields();
  // };

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowConfirmClose(true);
  };

  const handleConfirmClose = (event: MouseEvent<HTMLButtonElement>, confirmClose: string) => {
    event.preventDefault();
    setShowConfirmClose(false);
    
    if (confirmClose === SAVINGS_CONFIRM_CLOSE.yes) {
      closeSavingsAccount(financeItemInfo.savingsAccountName);
    }
  };

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
                <Button type="submit">Update</Button>
                <Button type="button" onClick={ handleClose }>Close Account</Button>
              </div>
            </div>
          </div>

          {
            showConfirmClose === true &&
            <div className="row">
              <div className="col-12">
                <Typography sx={{ marginTop: "4%" }} paragraph>Sure you want to close the savings account?</Typography>
              </div>
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button className="saving-button-confirm-close" type="button"
                        onClick={ (event) => handleConfirmClose(event, SAVINGS_CONFIRM_CLOSE.yes) }>Yes</Button>
                  <Button className="saving-button-confirm-close" type="button"
                          onClick={ (event) => handleConfirmClose(event, SAVINGS_CONFIRM_CLOSE.no) }>No</Button>
                </div>
              </div>
            </div>
          }
        </div>
      </form>
    </SimplePaper>
  </UpdateSavingsAccountContainer>
  );
}

export default UpdateAccountForm;