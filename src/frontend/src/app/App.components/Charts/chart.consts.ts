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
  position: 'left',
  show: true,
  showAlways: true,
  showForNullSeries: true,
  tickAmount: 14,
  min: (min: number) => min - (min / 100) * 50,
  max: (max: number) => max + (max / 100) * 10,
  labels: {
    show: true,
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
  type: 'category' as "category",
  position: 'bottom',
  labels: {
    show: true,
    formatter: (date: string) => dayjs(date).format('MMM DD, HH:mm'),
    hideOverlappingLabels: true,
    showDuplicates: false,
    rotate: -10,
    rotateAlways: true,
    offsetY: 10,
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
    show: true,
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
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 0.3,
      stops: [0, 50, 100],
      colorStops: [ 
        [
          {
            offset: 0,
            color: '#AEEDE1',
            opacity: 0.85
          },
          {
            offset: 35,
            color: '#AEEDE1',
            opacity: 0.7
          },
          {
            offset: 65,
            color: '#AEEDE1',
            opacity: 0.4
          },
          {
            offset: 100,
            color: '#160E3F',
            opacity: 0
          },
        ],
      ]
    }
  },
  stroke: {
    show: false
  }
}