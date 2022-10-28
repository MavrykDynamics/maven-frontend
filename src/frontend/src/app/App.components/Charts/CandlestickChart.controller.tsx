// @ts-nocheck
// import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType, State } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import Colors, { cyanColor } from 'styles/colors'
import { useMedia } from 'react-use'

import { scaleTime } from 'd3-scale'
import { utcDay, utcMinutes, utcHour, utcWeek, timeInterval } from 'd3-time'
import dayjs from 'dayjs'

import { ChartCanvas, Chart } from 'react-stockcharts'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import { EdgeIndicator } from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { HoverTooltip } from 'react-stockcharts/lib/tooltip'
import { ema } from 'react-stockcharts/lib/indicator'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { timeIntervalBarWidth } from 'react-stockcharts/lib/utils'

const fiveMins = timeInterval(
  function (date) {
    date.setUTCMinutes(5, 0)
  },
  function (date, step) {
    date.setTime(+date + step * (6e4 * 10))
  },
  function (start, end) {
    return (end - start) / (6e4 * 5)
  },
  function (date) {
    return date.getUTCMinutes()
  },
)

const fiveteenMins = timeInterval(
  function (date) {
    date.setUTCMinutes(5, 0)
  },
  function (date, step) {
    date.setTime(+date + step * (6e4 * 20))
  },
  function (start, end) {
    return (end - start) / (6e4 * 15)
  },
  function (date) {
    return date.getUTCMinutes()
  },
)

const tooltipContent = ({ currentItem }) => {
  return {
    y: [
      {
        label: 'Close',
        value: currentItem.close ?? 0,
      },
    ],
    x: dayjs(currentItem.date).format('MMM DD, HH:mm'),
  }
}

// custom tootipGenerator fn
// const tooltipSVG = ({ fontFamily, fontSize, fontFill }, content) => {
//   const tspans = []
//   const startY = Y + fontSize * 0.9

//   for (let i = 0; i < content.y.length; i++) {
//     tspans.push(<tspan key={`V-${i}`}>{content.y[i].value}</tspan>)
//   }

//   return (
//     <text fontFamily={fontFamily} fontSize={fontSize} fill={fontFill}>
//       {tspans}
//       <tspan x={X} y={startY}>
//         {content.x}
//       </tspan>
//     </text>
//   )
// }

const CandlestickChart = ({
  chartData,
  width = 1400,
  interval,
  isMobileChart,
}: {
  chartData: any
  width?: any
  isMobileChart: boolean
  interval: IntervalType
}) => {
  const isMobileMax = useMedia('(max-width: 770px)')
  const isMobileMin = useMedia('(min-width: 550px)')
  const isMobSmall = useMedia('(max-width: 550px)')
  const theme = useSelector((state: State) => state.preferences.themeSelected)

  const xAccessor = (d) => d?.date
  const xExtents = [xAccessor(chartData.at(-1)), xAccessor(chartData[0])]

  const utcBarWidth =
    interval === 'quotes15mNogaps'
      ? fiveteenMins
      : interval === 'quotes5mNogaps'
      ? fiveMins
      : interval === 'quotes1hNogaps'
      ? utcHour
      : interval === 'quotes1dNogaps'
      ? utcDay
      : utcWeek

  return (
    // @ts-ignore
    // <Chart
    //   series={[{ data: chartData }]}
    //   options={CANDLESTICK_CHART_OPTIONS(interval, isMobileChart, Colors[theme])}
    //   type="candlestick"
    //   height={isMobileMax && isMobileMin ? '420px' : '500px'}
    //   width={'100%'}
    // />

    <ChartCanvas
      height={isMobileMax && isMobileMin ? 420 : 500}
      ratio={3}
      width={width}
      margin={{ left: 10, right: 60, top: 10, bottom: 30 }}
      type={'hybrid'}
      seriesName="MSFT"
      data={chartData}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.high + (d.high / 100) * 3, d.low - (d.low / 100) * 3]}>
        <HoverTooltip
          // tooltipSVG={tooltipSVG}
          tooltipContent={tooltipContent}
          bgFill={Colors[theme].toggleButtonColor}
          fill={Colors[theme].darkBackroundColor}
          fontFill={cyanColor}
          fontSize={15}
        />
        <XAxis
          axisAt="bottom"
          orient="bottom"
          tickStroke={Colors[theme].toggleButtonColor}
          stroke={Colors[theme].toggleButtonColor}
          tickFormat={(date: string) => dayjs(date).format('MMM DD, HH:mm')}
          tickPadding={isMobSmall ? 10 : 7}
          ticks={isMobSmall ? 3 : undefined}
        />
        <YAxis
          axisAt="right"
          orient="right"
          tickStroke={Colors[theme].toggleButtonColor}
          stroke={Colors[theme].toggleButtonColor}
        />
        <CandlestickSeries
          width={timeIntervalBarWidth(utcBarWidth)}
          wickStroke={(d) => (d.close > d.open ? Colors[theme].downColor : Colors[theme].upColor)}
          fill={(d) => (d.close > d.open ? Colors[theme].downColor : Colors[theme].upColor)}
        />
      </Chart>
    </ChartCanvas>
  )
}

export default fitWidth(CandlestickChart)
