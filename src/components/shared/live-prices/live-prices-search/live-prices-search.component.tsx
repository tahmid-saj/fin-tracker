import "./live-prices-search.styles.tsx"
import { DropButton } from "../../drop-button/drop-button.styles.tsx";
import { MarketDataSearchContainer } from "./live-prices-search.styles.tsx";

import { Typography } from "@mui/material";
import SimplePaper from "../../mui/paper/paper.component.tsx";
import FormInput from "../../form-input/form-input.component.tsx";
import Button from "../../button/button.component.tsx";

import { useContext, useState } from "react";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants"
import { useWebSocket } from "../../../../contexts/shared/live-prices/live-prices.context"

const initialFormFields = {
  marketDataType: "Crypto",
  marketDataTicker: "BTCUSD",
  marketDataInterval: "Hour",
  marketDataStartDate: "",
  marketDataEndDate: ""
}

const defaultFormFields = {
  marketDataType: "",
  marketDataTicker: "",
  marketDataInterval: "",
  marketDataStartDate: "",
  marketDataEndDate: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"]
};

const LivePricesSearch = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { getInitialPrices } = useWebSocket()

  const resetFormFields = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      formFields.marketDataType === "" ||
      formFields.marketDataTicker === "" ||
      formFields.marketDataInterval === "" ||
      formFields.marketDataStartDate === "" ||
      formFields.marketDataEndDate === ""
    ) {
      return
    }

    // get initial prices
    getInitialPrices(formFields)

    resetFormFields((event as unknown) as React.MouseEvent<HTMLButtonElement>)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <MarketDataSearchContainer>
      <SimplePaper styles={paperStyles}>
        <Typography variant="h6" sx={{ paddingBottom: "6%" }}>
          Search Live Prices
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

          <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>
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
            <option value="Minute">Minute</option>
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
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
}

export default LivePricesSearch