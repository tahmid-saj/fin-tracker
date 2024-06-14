import "./filter-insurance-form.styles.scss"
import FormInput from "../../../shared/form-input/form-input.component"
import { Typography } from "@mui/material"
import Button from "../../../shared/button/button.component"
import { ButtonsContainer } from "../../../shared/button/button.styles"
import { useState } from "react"
import { DropButton } from "../../../shared/drop-button/drop-button.styles"

import { useDispatch, useSelector } from "react-redux"
import { selectFilterConditions } from "../../../../store/signed-out/expenses/expenses.selector"
import { clearInsuranceFilter, filterInsurances } from "../../../../store/signed-out/insurance/insurance.action"

const defaultFormFields = {
  insuranceFor: "",
  insuranceInterval: "",
  insuranceStartDate: "",
  insuranceEndDate: ""
}

export const FilterInsuranceForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if ((!formFields.insuranceFor || formFields.insuranceFor === "") &&
      (!formFields.insuranceInterval || formFields.insuranceInterval === "") &&
      (!formFields.insuranceStartDate || formFields.insuranceStartDate === "") &&
      (!formFields.insuranceEndDate || formFields.insuranceEndDate === "")) {
      console.log("please fill out all info")
      return
    }

    dispatch(filterInsurances(formFields))
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    resetFormFields()
    dispatch(clearInsuranceFilter())
  }

  return (
    <div className="filter-insurance-form">
      <Typography variant="h6" sx={{ paddingBottom: "2%" }}>Filter Insurance</Typography>

      <form onSubmit={ (e) => handleSubmit(e) }>
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
        
        <ButtonsContainer>
          <Button type="submit">Filter</Button>
          <Button type="button" onClick={ handleClearFilter }>Clear Filter</Button>
        </ButtonsContainer>
      </form>
    </div>
  )
}

export default FilterInsuranceForm