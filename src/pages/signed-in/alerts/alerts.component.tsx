import { Divider } from "@mui/material"
import CreateAlert from "../../../components/signed-in/alerts/create-alert/create-alert.component"
import { AlertsContainer } from "./alerts.styles"
import AlertsList from "../../../components/signed-in/alerts/alerts-list/alerts-list.component"
import { useContext } from "react"
import { AlertsContext } from "../../../contexts/signed-in/alerts/alerts.context"

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
