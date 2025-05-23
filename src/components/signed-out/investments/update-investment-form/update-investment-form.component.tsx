import React, { useState, Component, useContext, MouseEvent } from "react";

import "./update-investment-form.styles.tsx";
import { UpdateInvestmentContainer, UpdateInvestmentFormContainer,
  ContributionInputContainer } from "./update-investment-form.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { INVESTMENT_CONFIRM_CLOSE } from "../../../../utils/constants/investments.constants.ts";
import Button from "../../../shared/button/button.component.tsx";
import { DropButton } from "../../../shared/drop-button/drop-button.styles.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector.ts";
import { updateInvestment, closeInvestment } from "../../../../store/signed-out/investments/investments.action.ts";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts";
import { Investment } from "../../../../store/signed-out/investments/investments.types.ts";
import { ChangeEvent } from "react";
import { FormEvent } from "react";

type FormFields = {
  investmentName: string,
  investmentType: string,
  startingAmount: string,
  startDate: string,
  afterYears: string,
  returnRate: string,
  compounded: string,
  additionalContribution: string,
  contributionAt: string,
  contributionInterval: string
}

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

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"]
}

const UpdateInvestmentForm = ({ financeItemInfo }: { financeItemInfo: Investment }) => {
  
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  // const { updateInvestment, closeInvestment } = useContext(InvestmentsContext);
  const dispatch = useDispatch()
  const investments = useSelector(selectInvestments)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formFields.investmentName === "" || !formFields.investmentName || formFields.investmentType === "" || 
      !formFields.investmentType || formFields.startingAmount === "" || !formFields.startingAmount ||
      formFields.startDate === "" || !formFields.startDate || formFields.afterYears === "" || 
      !formFields.afterYears || formFields.returnRate === "" || !formFields.returnRate || 
      formFields.compounded === "" || !formFields.compounded || formFields.additionalContribution === "" || 
      !formFields.additionalContribution || formFields.contributionAt === "" || !formFields.contributionAt ||
      formFields.contributionInterval === "" || !formFields.contributionInterval) {
  
      
      return;
    }

    dispatch(updateInvestment(investments!, financeItemInfo.investmentName, {
      ...formFields,

      startingAmount: Number(formFields.startingAmount),
      afterYears: Number(formFields.afterYears),
      returnRate: Number(formFields.returnRate),
      additionalContribution: Number(formFields.additionalContribution),

      endBalance: 0,
      totalContribution: 0,
      totalInterest: 0,
    
      investments: []
    }))
    resetFormFields();
  };

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowConfirmClose(true);
  };
  
  const handleConfirmClose = (event: MouseEvent<HTMLButtonElement>, confirmClose: string) => {
    event.preventDefault();
    setShowConfirmClose(false);

    if (confirmClose === INVESTMENT_CONFIRM_CLOSE.yes) {
      dispatch(closeInvestment(investments!, financeItemInfo.investmentName))
    }
  };

  return (
    <UpdateInvestmentContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">Create Investment</Typography>

        <form onSubmit={ handleUpdate }>
          <div className="container">
          <UpdateInvestmentFormContainer>
            <FormInput label="Investment name" type="text" required onChange={ handleChange }
                            name="investmentName" value={ formFields.investmentName }></FormInput>
          
            <FormInput label="Investment type" type="text" required onChange={ handleChange }
                              name="investmentType" value={ formFields.investmentType }></FormInput>
            
            <FormInput label="Starting amount" type="text" required onChange={ handleChange }
                              name="startingAmount" value={ formFields.startingAmount }></FormInput>

            <Typography paragraph>Start date</Typography>

            <FormInput type="date" required name="startDate" value={ formFields.startDate } 
                        onChange={ handleChange }></FormInput>
            
            <FormInput label="After how many years?" type="text" required onChange={ handleChange }
                              name="afterYears" value={ formFields.afterYears }></FormInput>
            
            <FormInput label="Return rate (%)" type="text" required onChange={ handleChange }
                              name="returnRate" value={ formFields.returnRate }></FormInput>

            <Typography sx={{ display: "inline-block", position: "relative" }} paragraph>Compounded</Typography>
            <DropButton required className="dropButton" name="compounded" id="compounded" 
                    onChange={ handleChange } value={ formFields.compounded }>
              <option value="Annually">Annually</option>
              <option value="Semiannually">Semiannually</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </DropButton>

            <FormInput label="Additional contribution" type="text" required onChange={ handleChange }
                          name="additionalContribution" value={ formFields.additionalContribution }></FormInput>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <ContributionInputContainer>
                    <Typography sx={{ marginLeft: "2%" }} paragraph>Contribution at the</Typography>
                    <DropButton required className="dropButton" name="contributionAt" id="contributionAt" 
                            onChange={ handleChange } value={ formFields.contributionAt }>
                      <option value="Beginning">Beginning</option>
                      <option value="End">End</option>
                    </DropButton>
                  </ContributionInputContainer>

                  <ContributionInputContainer>
                    <Typography sx={{ marginLeft: "2%" }} paragraph>of each</Typography>
                    <DropButton className="dropButton" name="contributionInterval" id="contributionInterval" 
                            onChange={ handleChange } value={ formFields.contributionInterval }>
                      <option value="Month">Month</option>
                      <option value="Year">Year</option>
                    </DropButton>
                  </ContributionInputContainer>
                </div>
              </div>
            </div>

          </UpdateInvestmentFormContainer>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Update</Button>
                  <Button type="button" onClick={ handleClose }>Close Investment</Button>
                </div>
              </div>
            </div>
          </div>

          {
            showConfirmClose === true &&
            <div className="row">
              <div className="col-12">
                <Typography sx={{ marginTop: "4%" }} paragraph>Sure you want to close the investment?</Typography>
              </div>
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="button" 
                    onClick={ (event) => handleConfirmClose(event, INVESTMENT_CONFIRM_CLOSE.yes) }>Yes</Button>
                  <Button type="button"
                    onClick={ (event) => handleConfirmClose(event, INVESTMENT_CONFIRM_CLOSE.no) }>No</Button>
                </div>
              </div>
            </div>
          }
        </form>
      </SimplePaper>
    </UpdateInvestmentContainer>
  );
}

export default UpdateInvestmentForm;