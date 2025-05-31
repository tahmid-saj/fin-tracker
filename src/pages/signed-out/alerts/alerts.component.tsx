import { Divider } from "@mui/material"
import CreateAlert from "../../../components/signed-in/alerts/create-alert/create-alert.component"
import { AlertsContainer } from "./alerts.styles"
import AlertsList from "../../../components/signed-in/alerts/alerts-list/alerts-list.component"

const Alerts = () => {

  return (
    <AlertsContainer>
      <CreateAlert/>

      <Divider/>

      {
        <AlertsList/>
      }
    </AlertsContainer>
  )
}

export default Alerts
