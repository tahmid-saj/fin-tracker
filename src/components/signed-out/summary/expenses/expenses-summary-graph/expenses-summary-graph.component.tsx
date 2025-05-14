import "./expenses-summary-graph.styles.jsx"
import { ExpensesSummaryGraphContainer } from "./expenses-summary-graph.styles.jsx"
import { useContext, Fragment } from "react"
import ReactApexChart from "react-apexcharts"
// import { ExpensesContext } from "../../../../../contexts/signed-out/expenses/expenses.context"
import { useSelector } from "react-redux"
import { selectExpensesSummary } from "../../../../../store/signed-out/expenses/expenses.selector.ts"
import { COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import { ApexOptions } from "apexcharts"

const ExpensesSummaryGraph = () => {
  // const { expensesSummary } = useContext(ExpensesContext)
  const expensesSummary = useSelector(selectExpensesSummary)
  const { pastMonthExpenses } = expensesSummary!

  

  let expensesCategoryCosts = new Map()
  const categoryCosts = pastMonthExpenses?.map((expense) => {
    if (expensesCategoryCosts.has(String(expense.expenseCategory))) {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expensesCategoryCosts.get(expense.expenseCategory)) + Number(expense.expenseCost))
    } else {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expense.expenseCost))
    }
  })

  if (!expensesCategoryCosts.size) {
    return <Fragment></Fragment>
  }
  
  const series: ApexAxisChartSeries = [ ...expensesCategoryCosts.values() ]
  

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: COMMON_SPACING.pieChart.height,
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
    <ExpensesSummaryGraphContainer>
      <ReactApexChart options={ options } series={ series } type="donut" 
        height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
    </ExpensesSummaryGraphContainer>
  )
}

export default ExpensesSummaryGraph