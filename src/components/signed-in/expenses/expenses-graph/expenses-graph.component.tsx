import { Fragment, useContext } from "react"
import "./expenses-graph.styles.tsx"
import { ExpensesGraphContainer } from "./expenses-graph.styles.tsx"
import ReactApexChart from "react-apexcharts"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.pieChart.width,
}

const ExpensesGraph = () => {
  const { expensesView } = useContext(ExpensesContext)
  let expensesCategoryCosts = new Map()
  const categoryCosts = expensesView.map((expense) => {
    if (expensesCategoryCosts.has(String(expense.expenseCategory))) {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expensesCategoryCosts.get(expense.expenseCategory)) + Number(expense.expenseCost))
    } else {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expense.expenseCost))
    }
  })

  const series: ApexAxisChartSeries = [ ...expensesCategoryCosts.values() ] ?? []
  

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: [ ...expensesCategoryCosts.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <ExpensesGraphContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} variant="h6">Filtered categories</Typography>
        <ReactApexChart options={ options } series={ series } type="donut" 
          height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
      </SimplePaper>
    </ExpensesGraphContainer>
  )
}

export default ExpensesGraph