import { UTCTimestamp } from 'lightweight-charts'
import { useSelector } from 'react-redux'

// types
import { State } from 'utils/interfaces'

// components
import { Chart } from 'app/App.components/Chart/Chart.view'
import Icon from 'app/App.components/Icon/Icon.view'

// styles
import { BakeryChartStyled } from "../Bakery.style"
import themeColors from 'styles/colors'

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
  const { themeSelected } = useSelector((state: State) => state.preferences)

  return (
    <BakeryChartStyled>
      <div className='header'>
        <div className='info'>
          <Icon id='XTZ_tezos' />

          <div>
            <h3>XTZ/USD</h3>
            <p>0.7904400</p>
          </div>
        </div>

        <div className='percentages'>
          <span>~ 0.61%</span>
        </div>
      </div>

      <Chart
        data={chartData}
        colors={{
          lineColor: '#86D4C9',
          areaTopColor: '#86D4C9',
          areaBottomColor: 'rgba(119, 164, 242, 0)',
          textColor: themeColors[themeSelected].primaryTextCardColor,
          borderColor: 'transparent'
        }}
        settings={{
          height: 110,
          showTooltip: false,
          hideYAxis: true,
        }}
      />
    </BakeryChartStyled>
  )
}