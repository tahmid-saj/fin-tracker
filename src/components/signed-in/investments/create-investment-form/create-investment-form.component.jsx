import React, { useState, Component, useContext } from "react";

import "./create-investment-form.styles.jsx";
import { CreateInvestmentContainer, CreateInvestmentFormContainer,
  ContributionInputContainer
} from "./create-investment-form.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component";
import InvestmentSavingsTrackerItems from "../../investment-savings-tracker-items/investment-savings-tracker-items.component";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { Typography } from "@mui/material";
import { DropButton } from "../../../shared/drop-button/drop-button.styles.jsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";
import Button from "../../../shared/button/button.component.jsx";

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

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
}

const CreateInvestmentForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { createInvestment } = useContext(InvestmentsContext);

  const resetFormFields = () => {
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

      
      return;
    }

    createInvestment(formFields);
    resetFormFields();

    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <CreateInvestmentContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">Create Investment</Typography>

        <form onSubmit={ handleSubmit }>
          <div className="container">
          <CreateInvestmentFormContainer>
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
          </CreateInvestmentFormContainer>

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
    </CreateInvestmentContainer>
  )
};

export default CreateInvestmentForm;