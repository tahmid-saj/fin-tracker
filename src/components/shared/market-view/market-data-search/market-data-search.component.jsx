import "./market-data-search.styles.jsx"
import { DropButton } from "../../drop-button/drop-button.styles.jsx"
import { ButtonsContainer } from "../../button/button.styles.jsx"
import { MarketDataSearchContainer } from "./market-data-search.styles.jsx"

import { useState, useContext } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import { MarketDataContext } from "../../../../contexts/shared/market-data/market-data.context"
import { Typography } from "@mui/material"

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

const MarketDataSearch = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { searchMarketData } = useContext(MarketDataContext)

  const resetFormFields = (event) => {
    event.preventDefault()
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formFields.marketDataType === "" || !formFields.marketDataType ||
    formFields.marketDataTicker === "" || !formFields.marketDataTicker ||
    formFields.marketDataInterval === "" || !formFields.marketDataInterval ||
    formFields.marketDataStartDate === "" || !formFields.marketDataStartDate ||
    formFields.marketDataEndDate === "" || !formFields.marketDataEndDate) {

      console.log("please fill out all info")
      return
    }

    await searchMarketData(formFields)
    resetFormFields(event)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
    console.log(formFields)
  }

  return (
    // TODO: make a component for dropdown below
    <MarketDataSearchContainer>
      <Typography variant="h6" sx={{ paddingBottom: "2%" }}>Search Market Data</Typography>

      <form onSubmit={ handleSubmit }>
        {/* <label className="marketTypeDropdown" htmlFor="marketDataType">Category</label> */}

        <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Category</Typography>
        <DropButton required name="marketDataType" id="marketDataType" 
                onChange={ handleChange } value={ formFields.marketDataType }>
          <option value="Crypto">Crypto</option>
          <option value="Currencies">Currencies</option>
          <option value="Indices">Indices</option>
          <option value="Stocks">Stocks</option>
        </DropButton>

        <FormInput label="Ticker" type="text" required onChange={ handleChange }
                    name="marketDataTicker" value={ formFields.marketDataTicker }></FormInput>

        {/* <label className="marketDataIntervalDropdown" htmlFor="marketDataInterval">Interval</label> */}
        <Typography sx={{ display: "inline-block", position: "relative" }} paragraph>Interval</Typography>
        <DropButton required className="dropButton" id="marketDataInterval" 
                onChange={ handleChange } value={ formFields.marketDataInterval }>
          <option value="Hour">Hour</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </DropButton>

        <Typography sx={{ marginTop: "2%" }} variant="subtitle2">Start date</Typography>
        <FormInput type="date" required onChange={ handleChange }
                  name="marketDataStartDate" value={ formFields.marketDataStartDate }></FormInput>

        <Typography variant="subtitle2">End date</Typography>
        <FormInput type="date" required onChange={ handleChange }
                  name="marketDataEndDate" value={ formFields.marketDataEndDate }></FormInput>
        
        <ButtonsContainer>
          <Button type="submit">Search</Button>
          <Button type="button" onClick={ (e) => resetFormFields(e) }>Clear</Button>
        </ButtonsContainer>
      </form>
    </MarketDataSearchContainer>
  )
}

export default MarketDataSearch