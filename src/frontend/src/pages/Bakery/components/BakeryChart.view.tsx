import { UTCTimestamp } from 'lightweight-charts'

// styles
import { BakeryChartStyled } from "../Bakery.style"

const chartData = [
  {
    "value": 100000000000,
    "time": new Date("2022-12-20T14:26:15+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 64997812677,
    "time": new Date ("2022-12-20T14:26:30+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 74997812677,
    "time": new Date ("2022-12-20T14:37:05+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 174997812677,
    "time": new Date ("2022-12-20T14:37:35+00:00").getTime() as UTCTimestamp,
  },
  {
    "value": 175007812677,
    "time": new Date ("2022-12-20T15:17:25+00:00").getTime() as UTCTimestamp,
  }
]

export function BakeryChart () {
  return (
    <BakeryChartStyled
      data={chartData}
      colors={{
        lineColor: '#86D4C9',
        areaTopColor: '#86D4C9',
        areaBottomColor: 'rgba(119, 164, 242, 0)',
        textColor: '#CDCDCD',
        borderColor: 'transparent'
      }}
      settings={{
        height: 110,
        showTooltip: false,
      }}
    />
  )
}