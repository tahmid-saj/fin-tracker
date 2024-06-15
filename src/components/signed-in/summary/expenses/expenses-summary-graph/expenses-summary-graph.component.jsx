import "./expenses-summary-graph.styles.scss"
import { Fragment, useContext } from "react"
import ReactApexChart from "react-apexcharts"
import { ExpensesContext } from "../../../../../contexts/signed-in/expenses/expenses.context"

const ExpensesSummaryGraph = () => {
  const { expensesSummary } = useContext(ExpensesContext)
  const { pastMonthExpenses } = expensesSummary

  let expensesCategoryCosts = new Map()
  const categoryCosts = pastMonthExpenses.map((expense) => {
    if (expensesCategoryCosts.has(String(expense.expenseCategory))) {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expensesCategoryCosts.get(expense.expenseCategory)) + Number(expense.expenseCost))
    } else {
      expensesCategoryCosts.set(String(expense.expenseCategory), Number(expense.expenseCost))
    }
  })

  if (!expensesCategoryCosts.size) {
    return <Fragment></Fragment>
  }
  
  const series = [ ...expensesCategoryCosts.values() ]
  console.log(series)

  const options = {
    chart: {
      type: 'donut',
      height: 600,
    },
    labels: [ ...expensesCategoryCosts.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        chart: {
          height: 600
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <div className="expenses-summary-graph-container">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 400 } width={ 450 }/>
    </div>
  )
}

export default ExpensesSummaryGraph