// styles
import { Plug, TradingViewTooltipStyled } from './Chart.style'

// components
import Icon from '../Icon/Icon.view'

import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import { TradingViewAreaChart } from './AreaChart'
import { TradingViewCandleChart } from './CandleChart'
import { ChartNormalizerType, ChartTypeType } from 'utils/interfaces'

import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, BusinessDay, UTCTimestamp, BarPrices } from 'lightweight-charts'

// styles
import { ChartStyled } from './Chart.style'

// helpers
import { parseDate } from 'utils/time'

import { formatNumber } from '../CommaNumber/CommaNumber.controller'
import { headerColor, lightTextColor } from 'styles'

export type TradingViewChartBaseProps = {
  colors?: {
    lineColor?: string
    areaTopColor?: string
    areaBottomColor?: string
    textColor?: string
    borderColor?: string
  }
  settings: {
    height: number
    hideTooltip?: boolean
    hideXAxis?: boolean
    hideYAxis?: boolean
  }
  className?: string
}

export type TooltipPropsType = {
  amount?: number
  date?: string | number
}

export const TradingViewTooltip = ({ amount, date }: TooltipPropsType) => {
  if (amount === undefined || date === undefined) {
    return null
  }

  return (
    <TradingViewTooltipStyled>
      <div className="value">
        <CommaNumber endingText="MVK" value={amount} />
      </div>
      <div className="date">{date}</div>
    </TradingViewTooltipStyled>
  )
}

const isCandleChartData = (chartData: any): chartData is ChartNormalizerType['candlestick'] => {
  return chartData[0].close && chartData[0].open && chartData[0].high && chartData[0].low
}

const isAreaChartData = (chartData: any): chartData is ChartNormalizerType['area'] => {
  return chartData[0].value
}

export const Chart = ({
  data,
  colors,
  settings,
  numberOfItemsToDisplay = 15,
  className,
  chartType = 'area',
}: TradingViewChartBaseProps & {
  numberOfItemsToDisplay?: number
  chartType: ChartTypeType
  data: ChartNormalizerType['candlestick'] | ChartNormalizerType['area']
}) => {
  if (data.length < numberOfItemsToDisplay) {
    return (
      <Plug className={className}>
        <div>
          <Icon id="stars" className="icon-stars" />
          <Icon id="cow" className="icon-cow" />
        </div>

        <p>There is not enough data to display the chart</p>
      </Plug>
    )
  }

  if (chartType === 'candlestick' && isCandleChartData(data))
    return <TradingViewCandleChart data={data} settings={settings} colors={colors} className={className} />

  if (chartType === 'area' && isAreaChartData(data))
    return <TradingViewAreaChart data={data} settings={settings} colors={colors} className={className} />

  return null
}
