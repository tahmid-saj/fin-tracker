import { Typography } from "@mui/material"
import { CreateAlertContainer } from "./create-alert.styles.tsx"
import React, { useContext, useState } from "react"

import { DropButton } from "../../../shared/drop-button/drop-button.styles.tsx"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { AlertsContext } from "../../../../contexts/signed-out/alerts/alerts.context.tsx";

const initialFormFields = {
  ticker: "AAPL",
  direction: "DROP",
  threshold: "2000",
  email: ""
}

const defaultFormFields = {
  ticker: "",
  direction: "",
  threshold: "",
  email: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const CreateAlert = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { createAlert } = useContext(AlertsContext)
  
  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const deleteAllAlerts = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // deleteAllAlerts(email)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formFields.ticker === "" || formFields.direction === "" 
      || formFields.threshold || formFields.email === "") {
      return
    }

    // create alert
    createAlert({
      ticker: formFields.ticker,
      direction: formFields.direction,
      threshold: Number(formFields.threshold)
    }, formFields.email)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <CreateAlertContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Create an alert
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Ticker"
            type="text"
            required
            onChange={handleChange}
            name="ticker"
            value={formFields.ticker}
          />

          <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>
            Drop / Increase
          </Typography>
          <DropButton
            required
            className="dropButton"
            name="direction"
            id="direction"
            onChange={handleChange}
            value={formFields.direction}
          >
            <option value="DROP">DROP</option>
            <option value="INCREASE">INCREASE</option>
          </DropButton>

          <FormInput
            label="Threshold"
            type="text"
            required
            onChange={handleChange}
            name="threshold"
            value={formFields.threshold}
          />

          <FormInput
            label="Email"
            type="text"
            required
            onChange={handleChange}
            name="email"
            value={formFields.email}
          />

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Create</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                  <Button type="button" onClick={deleteAllAlerts}>
                    Delete All Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </CreateAlertContainer>
  );
}

export default CreateAlert