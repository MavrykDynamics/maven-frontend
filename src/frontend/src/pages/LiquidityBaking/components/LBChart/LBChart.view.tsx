import React, { useState } from 'react'
import { ChartStyled } from './LBChart.style'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import CandlestickChart from 'app/App.components/CandlestickChart/CandlestickChart.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import { IntervalType } from 'gql/queries/chart.query'
import { Button } from 'app/App.components/Button/Button.controller'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor } from 'styles'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'

const intervalData = [
  {
    title: '24H',
    value: 'quotes1hNogaps',
  },
  {
    title: '1W',
    value: 'quotes1dNogaps',
  },
  {
    title: '1M',
    value: 'quotes1w',
  },
  {
    title: '1Y',
    value: 'quotes1mo',
  },
  {
    title: 'All',
    value: 'quotesTotal',
  },
]

type LBChartViewProps = {
  selectedInterval: IntervalType
  changeSelectedInterval: (newInterval: IntervalType) => void
  chartData: any
  tztzBTC: number
}

export const LBChartView = ({ selectedInterval, changeSelectedInterval, tztzBTC, chartData }: LBChartViewProps) => {
  return (
    <ChartStyled>
      <div className="chart-controlls">
        <div className="chart-info">
          <img src="/images/sirius-icon.png" alt="" />
          <svg>
            <use xlinkHref="/icons/sprites.svg#exchange" />
          </svg>
          <div className="info">
            <CustomizedText color="#8D86EB" fontSize={14} fontWidth={600}>
              TZ/tzBTC (Sirius)
            </CustomizedText>
            <CustomizedText color={cyanColor} fontSize={14} fontWidth={600}>
              <CommaNumber value={tztzBTC} endingText="tz" />
            </CustomizedText>
          </div>
        </div>
        <div className="right-wrapper">
          <ToggleButton
            values={intervalData}
            selected={selectedInterval}
            handleSetSelectedToggler={(value: unknown) => changeSelectedInterval(value as IntervalType)}
          />
          <Button text={''} icon="toggleChartType" className="toggleChart" kind="transparent" />
        </div>
      </div>
      <div className="chart-wrapper">
        <CandlestickChart chartData={chartData} />
      </div>
    </ChartStyled>
  )
}
