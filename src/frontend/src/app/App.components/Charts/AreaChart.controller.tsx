import { ChartNormalizerType } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import { useMedia } from 'react-use'
import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, BusinessDay, UTCTimestamp } from 'lightweight-charts'

// styles
import { ChartStyled, Plug, TradingViewTooltipStyled } from './Chart.style'

// helpers
import { parseDate } from '../../../utils/time'

// components
import Icon from '../Icon/Icon.view'

import { CommaNumber, formatNumber } from '../CommaNumber/CommaNumber.controller'
import { headerColor, lightTextColor, skyColor } from 'styles'

export type ChartPlotType = { time: UTCTimestamp; value: number }
type TradingViewChartProps = {
  data: ChartNormalizerType['area'] | ChartNormalizerType['candlestick']
  colors?: {
    lineColor?: string
    areaTopColor?: string
    areaBottomColor?: string
    textColor?: string
    borderColor?: string
  }
  settings: {
    height: number
    tooltipAsset?: string
  }
  className?: string
  children?: React.ReactNode
}

type TooltipPropsType = {
  amount?: number
  date?: string | number
  tooltipAsset: string
}

const TradingViewTooltip = ({ amount, date, tooltipAsset }: TooltipPropsType) => {
  if (amount === undefined || date === undefined) {
    return null
  }

  return (
    <TradingViewTooltipStyled>
      <div className="value">
        <CommaNumber endingText={tooltipAsset} value={amount} showDecimal decimalsToShow={6} />
      </div>
      <div className="date">{date}</div>
    </TradingViewTooltipStyled>
  )
}

export const Chart = ({
  data,
  colors,
  settings,
  numberOfItemsToDisplay = 15,
  className,
  children = null,
}: TradingViewChartProps & { numberOfItemsToDisplay?: number; children?: React.ReactNode }) => {
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

  return (
    <TradingViewChart data={data} settings={settings} colors={colors} className={className}>
      {children}
    </TradingViewChart>
  )
}

const getChartType = (
  chartData: ChartNormalizerType['area'] | ChartNormalizerType['candlestick'],
): chartData is ChartNormalizerType['candlestick'] => {
  // @ts-ignore
  return chartData[0]?.close && chartData[0]?.open && chartData[0]?.low && chartData[0]?.high
}

export const TradingViewChart = ({
  data,
  colors: {
    lineColor = skyColor,
    areaTopColor = skyColor,
    areaBottomColor = 'transparent',
    textColor = lightTextColor,
    borderColor = headerColor,
  } = {},
  settings: { height, tooltipAsset = 'XTZ/tzBTC' },
  className,
  children,
}: TradingViewChartProps) => {
  const isChartTypeCandle = getChartType(data)
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const mainChartWrapperRef = useRef<HTMLDivElement | null>(null)
  const [tooltipValue, setTooltipValue] = useState<Omit<TooltipPropsType, 'tooltipAsset'>>({
    amount: isChartTypeCandle ? data.at(-1)?.close : data.at(-1)?.value,
    date: data.at(-1)?.time,
  })

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth ?? 0 })
    }

    const chart = createChart(chartContainerRef?.current ?? '', {
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor,
        fontSize: 12,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      localization: {
        locale: 'en-US',
        timeFormatter: (time: BusinessDay | UTCTimestamp) => {
          return parseDate({ time: Number(time), timeFormat: 'HH:mm' }) ?? ''
        },
      },
    })

    // Setting the border color for the vertical axis
    chart.priceScale().applyOptions({
      borderColor,
    })

    // Setting the border color for the horizontal axis
    chart.timeScale().applyOptions({
      borderColor,
      tickMarkFormatter: (time: UTCTimestamp | BusinessDay) => {
        return parseDate({ time: Number(time), timeFormat: 'HH:mm' }) ?? ''
      },
      fixRightEdge: true,
      fixLeftEdge: true,
    })

    let series: any = null
    if (isChartTypeCandle) {
      series = chart.addCandlestickSeries({
        upColor: areaTopColor,
        downColor: areaBottomColor,
      })
      series.setData(data)
      series.applyOptions({
        lastValueVisible: false,
        priceLineVisible: false,
        priceFormat: {
          type: 'custom',
          minMove: 0.000001,
          formatter: (price: any) => parseFloat(price),
          // formatNumber({
          //   showDecimal: true,
          //   decimalsToShow: 6,
          //   number: parseFloat(price),
          // }),
        },
      })
    } else {
      series = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
      })

      series.setData(data)
      series.applyOptions({
        lastValueVisible: false,
        priceLineVisible: false,
        priceFormat: {
          type: 'custom',
          minMove: 0.000001,
          formatter: (price: any) => parseFloat(price),
          // formatNumber({
          //   showDecimal: true,
          //   decimalsToShow: 6,
          //   number: parseFloat(price),
          // }),
        },
      })
    }

    chart.subscribeCrosshairMove((param) => {
      if (
        !chartContainerRef?.current ||
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef?.current?.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef?.current?.clientHeight
      ) {
        // hide tooltip
        if (mainChartWrapperRef.current) {
          mainChartWrapperRef.current.style.setProperty('--translateX', '0')
          mainChartWrapperRef.current.style.setProperty('--translateY', '0')
        }
      } else {
        const barData = param.seriesPrices.get(series)
        console.log(barData)
        // @ts-ignore
        const numberAmount = barData?.close ? barData.close : barData
        // set tooltip values
        setTooltipValue({
          ...tooltipValue,
          date: parseDate({ time: Number(param.time), timeFormat: 'MMM DD, HH:mm Z' }) ?? '',
          amount: parseFloat(String(numberAmount)),
        })
        if (mainChartWrapperRef.current) {
          mainChartWrapperRef.current.style.setProperty('--translateX', `${param.point.x + 15}`)
          mainChartWrapperRef.current.style.setProperty('--translateY', `${param.point.y - 20}`)
        }
      }
    })

    window.addEventListener('resize', handleResize)
    chart.timeScale().fitContent()

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [areaBottomColor, areaTopColor, borderColor, data, height, isChartTypeCandle, lineColor, textColor, tooltipValue])

  return (
    <ChartStyled className={className} ref={mainChartWrapperRef}>
      <div ref={chartContainerRef} />
      <TradingViewTooltip amount={tooltipValue?.amount} date={tooltipValue?.date} tooltipAsset={tooltipAsset} />
      {children}
    </ChartStyled>
  )
}
