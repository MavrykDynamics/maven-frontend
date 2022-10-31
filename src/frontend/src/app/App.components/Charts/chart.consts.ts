import { IntervalType, MavrykTheme } from 'utils/interfaces'
import dayjs from 'dayjs'
import { INTERVAL_PRICE_CUSHION } from 'utils/consts'

export const getTooltipMarkup = (price: number, date: Date, themeColors: Record<string, string>) => `
<div style='color: ${themeColors.tooltipValue}'>
  ${price.toLocaleString('en-US', { maximumFractionDigits: 10 })}tz
</div>
<div style='color: ${themeColors.tooltipDate}; font-size: 11px; margin: 0 auto;'>${dayjs(date).format(
  'MMM DD, HH:mm',
)}</div>
`

const GRID_SETTING = {
  show: false,
}

const YAXIS_SETTING = (interval: IntervalType, textColor: string, isMobile?: boolean) => ({
  opposite: true,
  show: true,
  showAlways: !isMobile,
  showForNullSeries: true,
  tickAmount: 8,
  min: (min: number) => (min - INTERVAL_PRICE_CUSHION[interval] >= 0 ? min - INTERVAL_PRICE_CUSHION[interval] : min),
  max: (max: number) => max + INTERVAL_PRICE_CUSHION[interval],
  labels: {
    show: true,
    formatter: (value: any) =>
      parseInt(value).toLocaleString('en-US', {
        maximumFractionDigits: isMobile ? 1 : 4,
      }),
    style: {
      colors: textColor,
    },
  },
  axisBorder: {
    show: true,
    color: textColor,
  },
})

const XAXIS_SETTING = (textColor: string) => ({
  type: 'category' as 'category',
  tickAmount: 6,
  tickPlacement: 'on',
  labels: {
    show: true,
    formatter: (date: string) => dayjs(date).format('MMM DD, HH:mm'),
    hideOverlappingLabels: true,
    showDuplicates: false,
    rotate: 0,
    rotateAlways: false,
    offsetX: 10,
    offsetY: -2,
    style: {
      colors: textColor,
    },
  },
  axisBorder: {
    show: true,
    color: textColor,
    width: '100%',
    offsetY: 1,
  },
  axisTicks: {
    show: true,
    color: textColor,
  },
  tooltip: {
    enabled: false,
  },
})

const CHART_SETTING = {
  toolbar: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  sparkline: {
    enabled: false,
  },
}

const RESPONSIVE_SETTING = [
  {
    breakpoint: 1450,
    options: {
      xaxis: {
        labels: {
          offsetX: 7,
        },
      },
    },
  },
  {
    breakpoint: 1400,
    options: {
      xaxis: {
        tickAmount: 5,
      },
    },
  },
  {
    breakpoint: 1070,
    options: {
      xaxis: {
        tickAmount: 7,
      },
    },
  },
  {
    breakpoint: 800,
    options: {
      xaxis: {
        tickAmount: 5,
      },
    },
  },
  {
    breakpoint: 600,
    options: {
      xaxis: {
        tickAmount: 4,
      },
    },
  },
  {
    breakpoint: 530,
    options: {
      xaxis: {
        tickAmount: 3,
      },
    },
  },
  {
    breakpoint: 470,
    options: {
      xaxis: {
        tickAmount: 2,
      },
    },
  },
]

export const CANDLESTICK_CHART_OPTIONS = (interval: IntervalType, isMobileChart: boolean, theme: MavrykTheme) => ({
  chart: CHART_SETTING,
  xaxis: XAXIS_SETTING(theme.toggleButtonColor),
  yaxis: YAXIS_SETTING(interval, theme.toggleButtonColor, isMobileChart),
  responsive: RESPONSIVE_SETTING,
  grid: GRID_SETTING,
  tooltip: {
    custom: function ({ dataPointIndex, w }: any) {
      const dataForToltip = w.config.series[0].data[dataPointIndex]
      return getTooltipMarkup(dataForToltip.y[3], dataForToltip.x, theme)
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#27AE60',
        downward: '#FF4343',
      },
    },
  },
})

export const AREA_CHART_OPTIONS = (interval: IntervalType, isMobileChart: boolean, theme: MavrykTheme) => ({
  chart: CHART_SETTING,
  xaxis: XAXIS_SETTING(theme.toggleButtonColor),
  responsive: RESPONSIVE_SETTING,
  tooltip: {
    custom: function ({ dataPointIndex, w }: any) {
      const dataForToltip = w.config.series[0].data[dataPointIndex]
      return getTooltipMarkup(dataForToltip.y, dataForToltip.x, theme)
    },
  },
  yaxis: YAXIS_SETTING(interval, theme.toggleButtonColor, isMobileChart),
  grid: GRID_SETTING,
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
      colorStops: [
        [
          {
            offset: 0,
            color: '#86D4C9',
            opacity: 1,
          },
          {
            offset: 10,
            color: '#86D4C9',
            opacity: 0.6,
          },
          {
            offset: 30,
            color: '#86D4C9',
            opacity: 0.4,
          },
          {
            offset: 60,
            color: '#86D4C9',
            opacity: 0.2,
          },
          {
            offset: 100,
            color: '#86D4C9',
            opacity: 0.05,
          },
        ],
      ],
    },
  },
  stroke: {
    show: false,
  },
})
