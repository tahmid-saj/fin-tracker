import { Fragment, useContext } from "react"
import "./expenses-graph.styles.jsx"
import { ExpensesGraphContainer } from "./expenses-graph.styles.jsx"
import ReactApexChart from "react-apexcharts"
// import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"
import { useSelector } from "react-redux"
import { selectExpensesView } from "../../../../store/signed-out/expenses/expenses.selector"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { Typography } from "@mui/material"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.pieChart.width,
}

const ExpensesGraph = () => {
  // const { expensesView } = useContext(ExpensesContext)
  const expensesView = useSelector(selectExpensesView)
  
  let expensesCategoryCosts = new Map()
  const categoryCosts = expensesView.map((expense) => {
    if (expensesCategoryCosts.has(String(expense.expenseCategory))) {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expensesCategoryCosts.get(expense.expenseCategory)) + Number(expense.expenseCost))
    } else {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expense.expenseCost))
    }
  })

  const series = [ ...expensesCategoryCosts.values() ]
  

  const options = {
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