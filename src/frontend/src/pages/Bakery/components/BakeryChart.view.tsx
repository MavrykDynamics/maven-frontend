import { useSelector } from 'react-redux'

// types
import { State } from 'utils/interfaces'
import { ChartItem } from 'utils/interfaces'

// components
import { Chart } from 'app/App.components/Chart/Chart.view'
import Icon from 'app/App.components/Icon/Icon.view'

// styles
import { BakeryChartStyled } from '../Bakery.style'
import themeColors from 'styles/colors'

// helpers
import { percentageDifference } from 'utils/utils'

type Props = {
  chartData: ChartItem[]
}

export function BakeryChart({ chartData }: Props) {
  const { themeSelected } = useSelector((state: State) => state.preferences)

  const currentPrice = chartData.length ? Number(chartData[chartData.length - 1].value.toFixed(7)) : 0
  const initialPrice = chartData.length ? Number(chartData[0].value.toFixed(7)) : 0
  const changesInValue = percentageDifference(currentPrice, initialPrice)
  const isPositiveGrowth = currentPrice > initialPrice

  return (
    <BakeryChartStyled>
      <div className="header">
        <div className="info">
          <Icon id="XTZ_tezos" />

          <div>
            <h3>XTZ/USD</h3>
            <p>{currentPrice}</p>
          </div>
        </div>

        <div className="percentages">
          <span className={isPositiveGrowth ? 'green' : 'red'}>{changesInValue}%</span>
        </div>
      </div>

      <Chart
        data={chartData}
        colors={{
          lineColor: '#86D4C9',
          areaTopColor: '#86D4C9',
          areaBottomColor: 'rgba(119, 164, 242, 0)',
          textColor: themeColors[themeSelected].primaryTextCardColor,
          borderColor: 'transparent',
        }}
        settings={{
          height: 100,
          hideYAxis: true,
          hideTooltip: true,
          xAsisTimeFormat: 'HH:mm',
        }}
        chartType={'area'}
        tooltipAsset={'MVK'}
      />
    </BakeryChartStyled>
  )
}
