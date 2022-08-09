import dayjs from 'dayjs'

export const getTooltipMarkup = (price: number, date: Date) => `
<div style='color: #86d4c9'>
  ${price.toLocaleString('en-US', { maximumFractionDigits: 10 })}tz
</div>
<div style='color: #8d86eb'>${dayjs(date).format('MMM DD, HH:mm')}</div>
`
export const CANDLESTICK_CHART_OPTIONS = {
  chart: {
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
  },
  xaxis: {
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
  },
  yaxis: {
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
  },
  grid: {
    show: false,
  },
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