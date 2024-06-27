import "./investments.styles.jsx"
import { InvestmentsContainer, InvestmentSummaryContainer } from "./investments.styles.jsx"
import { AccordionTransition } from "../../../shared/mui/accordion/accordion.component.jsx"
import Summary from "../summary/summary.component.jsx"
import InvestmentInfo from "../investment-info/investment-info.component.jsx"
import SummaryGraphInvestment from "../summary-graph/summary-graph.component.jsx"
import SummaryTableInvestments from "../summary-table-investments/summary-table-investments.component.jsx"
import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component.jsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.js"
import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context.js"
import { useContext } from "react"

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const Investments = () => {
  const { investments } = useContext(InvestmentsContext)

  return (
    <InvestmentsContainer>
      {
        investments.map((investment, index) => {
          return (
            <AccordionTransition key={ index } header={ investment.investmentName }
              styles={ accordionStyles }>
              <InvestmentSummaryContainer>
                <Summary financeItemInfo={ investment }></Summary>
                <InvestmentInfo financeItemInfo={ investment }></InvestmentInfo>
              </InvestmentSummaryContainer>

              <SummaryGraphInvestment financeItemInfo={ investment }></SummaryGraphInvestment>
              <SummaryTableInvestments financeItemInfo={ investment }></SummaryTableInvestments>
              <UpdateInvestmentForm financeItemInfo={ investment }></UpdateInvestmentForm>
            </AccordionTransition>
          )
        })
      }
    </InvestmentsContainer>
  )
}

export default Investments