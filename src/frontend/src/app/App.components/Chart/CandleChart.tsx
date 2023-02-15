import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, BusinessDay, UTCTimestamp, BarData } from 'lightweight-charts'

// styles
import { ChartStyled } from './Chart.style'

// helpers
import { parseDate } from 'utils/time'

import { formatNumber } from '../CommaNumber/CommaNumber.controller'
import { headerColor, lightTextColor } from 'styles'
import { TooltipPropsType, TradingViewChartBaseProps, TradingViewTooltip } from './Chart.view'
import { ChartNormalizerType } from 'utils/interfaces'

export const TradingViewCandleChart = ({
  data,
  colors: { textColor = lightTextColor, borderColor = headerColor } = {},
  settings: { height, hideXAxis, hideYAxis, xAsisTimeFormat },
  className,
  tooltipAsset,
}: TradingViewChartBaseProps & { data: ChartNormalizerType['candlestick']; tooltipAsset: string }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const mainChartWrapperRef = useRef<HTMLDivElement | null>(null)
  const [tooltipValue, setTooltipValue] = useState<TooltipPropsType>({
    amount: 0,
    date: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth ?? 0 })
    }

    const chart = createChart(chartContainerRef?.current ?? '', {
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
      width: chartContainerRef?.current?.clientWidth ?? 0,
      height,
      localization: {
        locale: 'en-US',
        timeFormatter: (time: BusinessDay | UTCTimestamp) => {
          return parseDate({ time: Number(time), timeFormat: xAsisTimeFormat }) ?? ''
        },
      },
      ...(hideXAxis
        ? {
            timeScale: {
              visible: false,
            },
          }
        : {}),
      ...(hideYAxis
        ? {
            rightPriceScale: {
              visible: false,
            },
            leftPriceScale: {
              visible: false,
            },
          }
        : {}),
    })

    // Setting the border color for the vertical axis
    chart.priceScale('right').applyOptions({
      borderColor,
      scaleMargins: {
        top: 0.1,
        bottom: 0.03,
      },
    })

    // Setting the border color for the horizontal axis
    chart.timeScale().applyOptions({
      borderColor,
      visible: true,
      tickMarkFormatter: (time: UTCTimestamp | BusinessDay) => {
        return parseDate({ time: Number(time), timeFormat: xAsisTimeFormat }) ?? ''
      },
      fixLeftEdge: true,
      fixRightEdge: true,
    })

    const series = chart.addCandlestickSeries({
      upColor: '#27AE60',
      downColor: '#FF4343',
    })
    series.setData(data)
    series.applyOptions({
      lastValueVisible: false,
      priceLineVisible: false,
      priceFormat: {
        type: 'custom',
        minMove: 0.000000001,
        formatter: (price: any) => formatNumber(true, 6, parseFloat(price)),
      },
    })

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
        const bar = param.seriesData.get(series)
        const barAmount = isExtendedChartPlot(bar) ? bar?.close : 0
        // set tooltip values
        setTooltipValue({
          ...tooltipValue,
          date: parseDate({ time: Number(param.time), timeFormat: 'MMM DD, HH:mm Z' }) ?? '',
          amount: parseFloat(String(barAmount)),
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
  }, [borderColor, data, height, hideXAxis, hideYAxis, textColor])

  return (
    <ChartStyled className={className} ref={mainChartWrapperRef}>
      <div ref={chartContainerRef} />
      <TradingViewTooltip amount={tooltipValue.amount} date={tooltipValue.date} asset={tooltipAsset} />
    </ChartStyled>
  )
}

const isExtendedChartPlot = (plot: any): plot is BarData => plot.close
