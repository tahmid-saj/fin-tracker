import "./summary-graph.styles"
import { SummaryGraphContainer } from "./summary-graph.styles";
import { Fragment, useContext } from "react"
import ReactApexChart from 'react-apexcharts';

import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants";
import SimplePaper from "../../../../shared/mui/paper/paper.component";
import { InvestmentsContext } from "../../../../../contexts/signed-in/investments/investments.context";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"]
}

const SummaryGraph = ({ financeItemInfo }) => {
  const { investments, getInvestmentInfo } = useContext(InvestmentsContext)
  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);


  // TODO: manage dates on graph better
  const startDate = new Date(investmentInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const startDateStr = year + '-' + month + '-' + day;
  const previousDay = day === 1 ? 28 : startDate.getDate();
  const endDate = `${Number(year) + Number(investmentInfo.afterYears)}-${month}-${day}`;
  const previousDate = `${Number(year)}-${month - 1}-${previousDay}`

  const { investments: investmentsSchedule } = investmentInfo

  

  let investmentTimes = []
  let monthlyInvestmentTotalInterestEarned = []
  let monthlyInvestmentEndBalance = []

  const monthlyInvestmentBalance = investmentsSchedule.map((investmentMonth) => {
    investmentTimes.push(investmentMonth.currentDate)

    monthlyInvestmentTotalInterestEarned.push(Number(investmentMonth.interestAccumulated).toFixed(2))
    monthlyInvestmentEndBalance.push(Number(investmentMonth.endingBalance).toFixed(2))

    return investmentMonth.endingBalance.toFixed(2)
  })

    // TODO: need to keep track of investments timeline by amount in calculations
    const series = [{
      name: financeItemInfo.investmentName,
      data: monthlyInvestmentEndBalance
    }];
  
    const options = {
      chart: {
        type: 'area',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Investment Value',
        align: 'left'
      },
      labels: investmentTimes,
      xaxis: {
        type: 'string',
        labels: {
          show: false
        }
      },
      yaxis: {
        opposite: false
      },
      legend: {
        horizontalAlign: 'right'
      }
    };
      
    return (
      <SummaryGraphContainer>
        <SimplePaper styles={ paperStyles }>
          <ReactApexChart options={ options } series={ series } type="area" 
            height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
        </SimplePaper>
      </SummaryGraphContainer>
    )
}

export default SummaryGraph