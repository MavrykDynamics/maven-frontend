import dayjs from 'dayjs'

export const getTooltipMarkup = (price: number, date: Date) => `
<div style='color: #86d4c9'>
  ${price.toLocaleString('en-US', { maximumFractionDigits: 10 })}tz
</div>
<div style='color: #8d86eb'>${dayjs(date).format('MMM DD, HH:mm')}</div>
`

const GRID_SETTING = {
  show: false,
}

const YAXIS_SETTING = {
  opposite: true,
  show: true,
  showAlways: true,
  showForNullSeries: true,
  tickAmount: 8,
  min: 0,
  max: 0,
  labels: {
    show: true,
    formatter: (value: any) => parseInt(value).toFixed(4),
    style: {
      colors: '#8D86EB',
    },
  },
  axisBorder: {
    show: true,
    color: '#8D86EB',
  },
}

const XAXIS_SETTING = {
  type: 'category' as 'category',
  tickAmount: 6,
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
      colors: '#8D86EB',
    },
  },
  axisBorder: {
    show: true,
    color: '#8D86EB',
    width: '100%',
    offsetY: 1,
  },
  axisTicks: {
    show: false,
    color: '#8D86EB',
  },
  tooltip: {
    enabled: false,
  },
}

const CHART_SETTING = {
  toolbar: {
    show: true,
    tools: {
      zoomin: true,
      zoomout: true,
      download: false,
      selection: false,
      zoom: false,
      pan: true,
      reset: false,
      customIcons: [],
    },
  },
  dataLabels: {
    enabled: false,
  },
  sparkline: {
    enabled: false,
  },
}

export const CANDLESTICK_CHART_OPTIONS = {
  chart: CHART_SETTING,
  xaxis: XAXIS_SETTING,
  yaxis: YAXIS_SETTING,
  grid: GRID_SETTING,
  tooltip: {
    custom: function ({ dataPointIndex, w }: any) {
      const dataForToltip = w.config.series[0].data[dataPointIndex]
      return getTooltipMarkup(dataForToltip.y[3], dataForToltip.x)
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
}

export const AREA_CHART_OPTIONS = {
  chart: CHART_SETTING,
  xaxis: XAXIS_SETTING,
  tooltip: {
    custom: function ({ dataPointIndex, w }: any) {
      const dataForToltip = w.config.series[0].data[dataPointIndex]
      return getTooltipMarkup(dataForToltip.y, dataForToltip.x)
    },
  },
  yaxis: YAXIS_SETTING,
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
            color: '#AEEDE1',
            opacity: 1,
          },
          {
            offset: 100,
            color: '#160E3F',
            opacity: 1,
          },
        ],
      ],
    },
  },
  stroke: {
    show: false,
  },
}
