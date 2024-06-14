import { useState, useContext } from "react"
import "./add-insurance-form.styles.scss"
import FormInput from "../../../shared/form-input/form-input.component"
import { DropButton } from "../../../shared/drop-button/drop-button.styles"
import { Typography } from "@mui/material"
import { ButtonsContainer } from "../../../shared/button/button.styles"
import Button from "../../../shared/button/button.component"

import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context"

const defaultInsuranceEndDate = new Date();
defaultInsuranceEndDate.setFullYear(defaultInsuranceEndDate.getFullYear() + 50);

const defaultFormFields = {
  insuranceFor: "",
  insurancePayment: "",
  insuranceInterval: "Daily",
  insuranceFirstPaymentDate: "",
  // optional
  // if insuranceEndDate is not specified, insurance will end after 50 years
  insuranceEndDate: defaultInsuranceEndDate.toISOString().split('T')[0]
}

const AddInsuranceForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { addInsurance } = useContext(InsuranceContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formFields.insuranceFor || formFields.insuranceFor === "" ||
      !formFields.insurancePayment || formFields.insurancePayment === "" ||
      !formFields.insuranceInterval || formFields.insuranceInterval === "" ||
      !formFields.insuranceFirstPaymentDate || formFields.insuranceFirstPaymentDate === "") {
      console.log("please fill out all info")
      return
    }

    addInsurance(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="add-insurance-form">
      <Typography variant="h6" sx={{ paddingBottom: "2%" }}>Add Insurance</Typography>

      <form onSubmit={ (e) => handleSubmit(e) }>
        <FormInput label="Insurance for" type="text" required onChange={ handleChange }
          name="insuranceFor" value={ formFields.insuranceFor }></FormInput>
        <FormInput label="Insurance payment per period" type="text" required onChange={ handleChange }
          name="insurancePayment" value={ formFields.insurancePayment }></FormInput>
        
        <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Interval</Typography>
        <DropButton required name="insuranceInterval" id="insuranceInterval" 
                onChange={ handleChange } value={ formFields.insuranceInterval }>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Semiannually">Semiannually</option>
          <option value="Annually">Annually</option>
        </DropButton>
        
        <Typography sx={{ marginTop: "2%" }} variant="subtitle2">Insurance first payment date</Typography>
        <FormInput type="date" required onChange={ handleChange }
                  name="insuranceFirstPaymentDate" value={ formFields.insuranceFirstPaymentDate }></FormInput>
        
        <Typography paragraph>Optional:</Typography>
        <Typography sx={{ marginTop: "2%" }} variant="subtitle2">End date</Typography>
        <FormInput type="date" onChange={ handleChange }
                  name="insuranceEndDate" value={ formFields.insuranceEndDate }></FormInput>
        
        <ButtonsContainer>
          <Button type="submit">Add</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </ButtonsContainer>
      </form>
    </div>
  )
}

export default AddInsuranceForm