import "./currencies.styles.scss"
import { restClient } from "@polygon.io/client-js"

const InvestmentForexGraph = () => {
  const polygonRestClient = restClient(process.env.REACT_APP_POLYGON_API_KEY)

  polygonRestClient.forex.aggregates("C:USDCAD", 1, "day", "2024-01-01", "2024-04-14")
  .then(res => console.log(res))
  .catch(err => console.log(err))

  return (
    <div>

    </div>
  )
}

export default InvestmentForexGraph