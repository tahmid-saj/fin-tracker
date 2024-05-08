import "./stocks.styles.scss"
import { restClient } from "@polygon.io/client-js"

const InvestmentStocksGraph = () => {
  const polygonRestClient = restClient(process.env.REACT_APP_POLYGON_API_KEY)
  
  polygonRestClient.crypto.aggregates("AAPL", 1, "day", "2023-01-01", "2023-02-02")
    .then(res => console.log(res))
    .catch(err => console.log(err))

  return (
    <div>

    </div>
  )
}

export default InvestmentStocksGraph