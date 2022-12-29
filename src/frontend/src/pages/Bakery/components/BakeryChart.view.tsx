import { UTCTimestamp } from 'lightweight-charts'
import { useSelector } from 'react-redux'
import CoinGecko from 'coingecko-api'
// types
import { State } from 'utils/interfaces'

// components
import { Chart } from 'app/App.components/Chart/Chart.view'
import Icon from 'app/App.components/Icon/Icon.view'

// styles
import { BakeryChartStyled } from "../Bakery.style"
import themeColors from 'styles/colors'
import { useEffect, useState } from 'react'

const coinGeckoClient = new CoinGecko()


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
console.log("🚀 ~ file: BakeryChart.view.tsx:41 ~ chartData", chartData)

export function BakeryChart () {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const [data, setData] = useState<any>([])

  useEffect(() => {
    async function fetchData () {
      let x = await coinGeckoClient.coins.fetchMarketChart('tezos', { vs_currency: 'usd', days: '1' });

      setData(x.data.prices.map((item) => {
        return {
          value: item[1],
          time: new Date (item[0]).getTime(),
        }
      }))
    }

    fetchData()
  }, [])
  console.log(data);
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
        data={data}
        colors={{
          lineColor: '#86D4C9',
          areaTopColor: '#86D4C9',
          areaBottomColor: 'rgba(119, 164, 242, 0)',
          textColor: themeColors[themeSelected].primaryTextCardColor,
          borderColor: 'transparent'
        }}
        settings={{
          height: 100,
          showTooltip: false,
          hideYAxis: true,
        }}
      />
    </BakeryChartStyled>
  )
}