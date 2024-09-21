import "./market-data-search.styles.jsx";
import { DropButton } from "../../drop-button/drop-button.styles.js";
import { ButtonsContainer } from "../../button/button.styles.js";
import { MarketDataSearchContainer } from "./market-data-search.styles.jsx";

import { useState, useContext } from "react";
import FormInput from "../../form-input/form-input.component.js";
import Button from "../../button/button.component.js";
import { MarketDataContext } from "../../../../contexts/shared/market-data/market-data.context.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../mui/paper/paper.component.js";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js";

const initialFormFields = {
  marketDataType: "Crypto",
  marketDataTicker: "BTCUSD",
  marketDataInterval: "Hour",
  marketDataStartDate: "",
  marketDataEndDate: ""
};

const defaultFormFields = {
  marketDataType: "",
  marketDataTicker: "",
  marketDataInterval: "",
  marketDataStartDate: "",
  marketDataEndDate: ""
};

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
};

const MarketDataSearch = () => {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { searchMarketData } = useContext(MarketDataContext);

  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formFields.marketDataType === "" ||
      formFields.marketDataTicker === "" ||
      formFields.marketDataInterval === "" ||
      formFields.marketDataStartDate === "" ||
      formFields.marketDataEndDate === ""
    ) {
      return;
    }

    await searchMarketData(formFields);
    resetFormFields((event as unknown) as React.MouseEvent<HTMLButtonElement>);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <MarketDataSearchContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Search Market Data
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>
            Category
          </Typography>
          <DropButton
            required
            name="marketDataType"
            id="marketDataType"
            onChange={handleChange}
            value={formFields.marketDataType}
          >
            <option value="Crypto">Crypto</option>
            <option value="Currencies">Currencies</option>
            <option value="Indices">Indices</option>
            <option value="Stocks">Stocks</option>
          </DropButton>

          <FormInput
            label="Ticker"
            type="text"
            required
            onChange={handleChange}
            name="marketDataTicker"
            value={formFields.marketDataTicker}
          />

          <Typography sx={{ display: "inline-block", position: "relative" }} paragraph>
            Interval
          </Typography>
          <DropButton
            required
            className="dropButton"
            name="marketDataInterval"
            id="marketDataInterval"
            onChange={handleChange}
            value={formFields.marketDataInterval}
          >
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
          </DropButton>

          <Typography sx={{ marginTop: "2%" }} variant="subtitle2">
            Start date
          </Typography>
          <FormInput
            type="date"
            required
            onChange={handleChange}
            name="marketDataStartDate"
            value={formFields.marketDataStartDate}
          />

          <Typography variant="subtitle2">End date</Typography>
          <FormInput
            type="date"
            required
            onChange={handleChange}
            name="marketDataEndDate"
            value={formFields.marketDataEndDate}
          />

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Search</Button>
                  <Button type="button" onClick={resetFormFields}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </MarketDataSearchContainer>
  );
};

export default MarketDataSearch;
