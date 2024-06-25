import { Fragment } from "react"
import SummaryInfo from "../summary-info/summary-info.component"
import "./finance-summary.styles"
import SummaryGraph from "./summary-graph.component"
import { AccordionTransition } from "../../../../shared/mui/accordion/accordion.component"
import { COLOR_CODES, NAV_LINKS } from "../../../../../utils/constants/shared.constants"
import Button from "../../../../shared/button/button.component"
import { useNavigate } from "react-router-dom"

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const FinanceSummary = ({ financeItemInfo }) => {
  const navigate = useNavigate()

  const handleAccountClick = (event) => {
    event.preventDefault()
    navigate(NAV_LINKS.paths.signedOut.banking)
  }

  return (
    <AccordionTransition header={ 
      <Button type="button" onClick={ handleAccountClick }>{`${financeItemInfo.name}`}</Button>
     } styles={ accordionStyles }>
      <SummaryInfo financeItemInfo={ financeItemInfo }></SummaryInfo>
      <SummaryGraph financeItemInfo={ financeItemInfo }></SummaryGraph>
    </AccordionTransition>
  )
}

export default FinanceSummary