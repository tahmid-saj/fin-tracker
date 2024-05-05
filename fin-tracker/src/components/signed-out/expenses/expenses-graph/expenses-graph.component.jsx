import { Fragment, useContext } from "react"
import "./expenses-graph.styles.scss"
import ReactApexChart from "react-apexcharts"
import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"

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
    <div className="expenses-graph-container">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 600 } width={ 650 }/>
    </div>
  )
}

export default ExpensesGraph