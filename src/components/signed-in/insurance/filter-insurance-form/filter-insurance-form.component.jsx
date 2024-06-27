import "./filter-insurance-form.styles.jsx"
import { InsuranceFilterContainer, InsuranceFilterFormContainer } from "./filter-insurance-form.styles.jsx"
import FormInput from "../../../shared/form-input/form-input.component"
import { Typography } from "@mui/material"
import Button from "../../../shared/button/button.component"
import { ButtonsContainer } from "../../../shared/button/button.styles"
import { useState } from "react"
import { DropButton } from "../../../shared/drop-button/drop-button.styles"

import { useContext } from "react"
import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context"

import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"

const defaultFormFields = {
  insuranceFor: "",
  insuranceInterval: "",
  insuranceStartDate: "",
  insuranceEndDate: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  display: "flex",
  justifyContent: "center"
}

export const FilterInsuranceForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { filterInsurances, clearInsuranceFilter } = useContext(InsuranceContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if ((!formFields.insuranceFor || formFields.insuranceFor === "") &&
      (!formFields.insuranceInterval || formFields.insuranceInterval === "") &&
      (!formFields.insuranceStartDate || formFields.insuranceStartDate === "") &&
      (!formFields.insuranceEndDate || formFields.insuranceEndDate === "")) {
      
      return
    }

    filterInsurances(formFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    resetFormFields()
    clearInsuranceFilter()
  }

  return (
    <InsuranceFilterContainer>
      <SimplePaper styles={ paperStyles }>
        <InsuranceFilterFormContainer onSubmit={ (e) => handleSubmit(e) }>
          <Typography variant="h6" sx={{ paddingBottom: "2%" }}>Filter Insurance</Typography>
          <FormInput label="Insurance for" type="text" onChange={ handleChange }
              name="insuranceFor" value={ formFields.insuranceFor }></FormInput>

          <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Interval</Typography>
          <DropButton name="insuranceInterval" id="insuranceInterval" 
                  onChange={ handleChange } value={ formFields.insuranceInterval }>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Semiannually">Semiannually</option>
            <option value="Annually">Annually</option>
          </DropButton>

          <Typography sx={{ marginTop: "2%" }} variant="subtitle2">Start date</Typography>
          <FormInput type="date" onChange={ handleChange }
                    name="insuranceStartDate" value={ formFields.insuranceStartDate }></FormInput>
          
          <Typography sx={{ marginTop: "2%" }} variant="subtitle2">End date</Typography>
          <FormInput type="date" onChange={ handleChange }
                    name="insuranceEndDate" value={ formFields.insuranceEndDate }></FormInput>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Filter</Button>
                  <Button type="button" onClick={ handleClearFilter }>Clear Filter</Button>
                </div>
              </div>
            </div>
          </div>
        </InsuranceFilterFormContainer>
      </SimplePaper>
    </InsuranceFilterContainer>
  )
}

export default FilterInsuranceForm