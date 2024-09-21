import "./exchange-rate.styles.jsx";
import { ExchangeRateContainer } from "./exchange-rate.styles.jsx";

import { useState, useContext, FormEvent, ChangeEvent } from "react";
import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";
import ExchangeRateResult from "./exchange-rate-result.component";
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../mui/paper/paper.component.jsx";

interface FormFields {
  fromCurrency: string;
  toCurrency: string;
}

const defaultFormFields: FormFields = {
  fromCurrency: "",
  toCurrency: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.general["2"],
  width: "auto",
};

const ExchangeRate = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { exchangeRateResult, findExchangeRate } = useContext(UsefulToolsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await findExchangeRate(formFields);
    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <ExchangeRateContainer>
      <SimplePaper styles={paperStyles}>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ paddingBottom: "2%", color: COLOR_CODES.general["0"] }} variant="h6">
            Find the exchange rate
          </Typography>

          <FormInput
            label="From (currency)"
            type="text"
            required
            onChange={handleChange}
            name="fromCurrency"
            value={formFields.fromCurrency}
          />
          <FormInput
            label="To (currency)"
            type="text"
            required
            onChange={handleChange}
            name="toCurrency"
            value={formFields.toCurrency}
          />

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Find</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {exchangeRateResult && <ExchangeRateResult />}
      </SimplePaper>
    </ExchangeRateContainer>
  );
};

export default ExchangeRate;
