import "./currency-converter.styles.jsx";
import { CurrencyConverterContainer } from "./currency-converter.styles.jsx";

import { useState, useContext, Fragment, ChangeEvent, FormEvent } from "react";
import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";
import CurrencyConverterResult from "./currency-converter-result.component";
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context";
import { Typography } from "@mui/material";
import { ButtonsContainer } from "../../button/button.styles.jsx";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../mui/paper/paper.component.jsx";

interface FormFields {
  fromCurrency: string;
  fromCurrencyAmount: string;
  toCurrency: string;
}

const defaultFormFields: FormFields = {
  fromCurrency: "",
  fromCurrencyAmount: "",
  toCurrency: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.general["2"],
  width: "auto",
};

const CurrencyConverter = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { currencyConverterResult, convertCurrency } = useContext(UsefulToolsContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await convertCurrency({
      fromCurrency: String(formFields.fromCurrency),
      fromCurrencyAmount: Number(formFields.fromCurrencyAmount),
      toCurrency: String(formFields.toCurrency),
    });
    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <CurrencyConverterContainer>
      <SimplePaper styles={paperStyles}>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ paddingBottom: "2%", color: COLOR_CODES.general["0"] }} variant="h6">
            Convert currency
          </Typography>

          <Typography sx={{ color: COLOR_CODES.general["0"] }} paragraph>
            From
          </Typography>
          <FormInput
            label="Amount"
            type="text"
            required
            onChange={handleChange}
            name="fromCurrencyAmount"
            value={formFields.fromCurrencyAmount}
          />
          <FormInput
            label="From (currency)"
            type="text"
            required
            onChange={handleChange}
            name="fromCurrency"
            value={formFields.fromCurrency}
          />

          <Typography sx={{ color: COLOR_CODES.general["0"] }} paragraph>
            To
          </Typography>
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
                  <Button type="submit">Convert</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {currencyConverterResult && <CurrencyConverterResult />}
      </SimplePaper>
    </CurrencyConverterContainer>
  );
};

export default CurrencyConverter;
