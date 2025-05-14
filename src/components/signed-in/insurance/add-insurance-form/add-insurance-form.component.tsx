import { useState, useContext, FormEvent, ChangeEvent } from "react"
import "./add-insurance-form.styles.tsx"
import { AddInsuranceContainer, AddInsuranceFormContainer } from "./add-insurance-form.styles.tsx"
import FormInput from "../../../shared/form-input/form-input.component.tsx"
import { DropButton } from "../../../shared/drop-button/drop-button.styles.tsx"
import { Typography } from "@mui/material"
import Button from "../../../shared/button/button.component.tsx"

import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context.tsx"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"

type FormFields = {
  insuranceFor: string,
  insurancePayment: string,
  insuranceInterval: string,
  insuranceFirstPaymentDate: string,
  insuranceEndDate: string
}

const defaultInsuranceEndDate = new Date();
defaultInsuranceEndDate.setFullYear(defaultInsuranceEndDate.getFullYear() + 50);

const defaultFormFields = {
  insuranceFor: "",
  insurancePayment: "",
  insuranceInterval: "Daily",
  insuranceFirstPaymentDate: "",
  // optional
  // if insuranceEndDate is not specified, insurance will end after 50 years
  insuranceEndDate: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
}

const AddInsuranceForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { addInsurance } = useContext(InsuranceContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formFields.insuranceFor || formFields.insuranceFor === "" ||
      !formFields.insurancePayment || formFields.insurancePayment === "" ||
      !formFields.insuranceInterval || formFields.insuranceInterval === "" ||
      !formFields.insuranceFirstPaymentDate || formFields.insuranceFirstPaymentDate === "") {
      
      return
    }

    const adjustedFormFields = {
      ...formFields,
      insurancePayment: Number(formFields.insurancePayment),
      insuranceEndDate: formFields.insuranceEndDate === "" ? defaultInsuranceEndDate.toISOString().split('T')[0] : formFields.insuranceEndDate
    }

    addInsurance(adjustedFormFields)
    resetFormFields()
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <AddInsuranceContainer>
      <AddInsuranceFormContainer>
        <SimplePaper styles={ paperStyles }>
          <Typography variant="h6" sx={{ paddingBottom: "2%" }}>Add Insurance</Typography>

          <form onSubmit={ (e) => handleSubmit(e) }>
            <FormInput label="Insurance for" type="text" required onChange={ handleChange }
              name="insuranceFor" value={ formFields.insuranceFor }></FormInput>
            <FormInput label="Insurance payment per period" type="text" required onChange={ handleChange }
              name="insurancePayment" value={ formFields.insurancePayment }></FormInput>
            
            <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} 
              paragraph>Interval</Typography>
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

            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="btn-group flex-wrap">
                    <Button type="submit">Add</Button>
                    <Button type="button" onClick={ resetFormFields }>Clear</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </SimplePaper>
      </AddInsuranceFormContainer>
    </AddInsuranceContainer>
  )
}

export default AddInsuranceForm