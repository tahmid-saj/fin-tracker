import { Divider } from "@mui/material"
import CreateAlert from "../../../components/signed-out/alerts/create-alert/create-alert.component"
import { AlertsContainer } from "./alerts.styles"
import AlertsList from "../../../components/signed-out/alerts/alerts-list/alerts-list.component"
import { useContext } from "react"
import { AlertsContext } from "../../../contexts/signed-out/alerts/alerts.context"

const Alerts = () => {
  const { alerts } = useContext(AlertsContext)

  return (
    <AlertsContainer>
      <CreateAlert/>

      <Divider/>

      {
        alerts !== undefined && alerts.length !== 0 && <AlertsList/>
      }
    </AlertsContainer>
  )
}

export default Alerts
