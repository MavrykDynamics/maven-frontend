import React from 'react'
import { ChartStyled } from './LBChart.style'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import CandlestickChart from 'app/App.components/Charts/CandlestickChart.controller'

export const LBChartView = () => {
  const { chartData } = useSelector((state: State) => state.chart)

  return (
    <ChartStyled>
      <div className="chart-wrapper">
        <CandlestickChart />
      </div>
    </ChartStyled>
  )
}
