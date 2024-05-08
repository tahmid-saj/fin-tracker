import "./market-data-search.styles.scss"
import { useState, useContext } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import { MarketDataContext } from "../../../../contexts/shared/market-data/market-data.context"

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
    <div className="market-data-search-container">
      <form onSubmit={ handleSubmit }>
        <label className="marketTypeDropdown" htmlFor="marketDataType">Category</label>

        <select required className="dropButton" name="marketDataType" id="marketDataType" 
                onChange={ handleChange } value={ formFields.marketDataType }>
          <option value="Crypto">Crypto</option>
          <option value="Currencies">Currencies</option>
          <option value="Indices">Indices</option>
          <option value="Stocks">Stocks</option>
        </select>

        <FormInput label="Ticker" type="text" required onChange={ handleChange }
                    name="marketDataTicker" value={ formFields.marketDataTicker }></FormInput>

        <label className="marketDataIntervalDropdown" htmlFor="marketDataInterval">Interval</label>

        <select required className="dropButton" name="marketDataInterval" id="marketDataInterval" 
                onChange={ handleChange } value={ formFields.marketDataInterval }>
          <option value="Hour">Hour</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>

        <h5>Start</h5>
        <FormInput type="date" required onChange={ handleChange }
                  name="marketDataStartDate" value={ formFields.marketDataStartDate }></FormInput>

        <h5>End</h5>
        <FormInput type="date" required onChange={ handleChange }
                  name="marketDataEndDate" value={ formFields.marketDataEndDate }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Search</Button>
          <Button type="button" onClick={ (e) => resetFormFields(e) }>Clear</Button>
        </div>
      </form>
    </div>
  )
}

export default MarketDataSearch