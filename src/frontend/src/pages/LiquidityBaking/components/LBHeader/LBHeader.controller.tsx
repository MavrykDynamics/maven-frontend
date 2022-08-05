import { cyanColor } from 'styles'
import { LBHeaderStyled } from './LBHeader.style'
import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { calculateAPY, diffBetweenCoinsInPersent } from 'utils/utils'

const LBHeader = () => {
  const {
    lbData: { token_pool, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const tzbtcBitcoinPriceDiff = diffBetweenCoinsInPersent(coinPrices.tzbtc.usd, coinPrices.bitcoin.usd)

  // TODO: fix this calculation with correct args
  const APY = calculateAPY(coinPrices.tezos.usd, lqt_total)
  return (
    <LBHeaderStyled>
      <div className="title">
        <svg>
          <use xlinkHref="/icons/sprites.svg#LBLogo" />
        </svg>
        <CustomizedText fontWidth={700} fontSize={35}>
          Liquidity Baking
        </CustomizedText>
      </div>

      <div className="info-wrapper">
        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            Total Value Locked
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber beginningText="$" value={lqt_total} />
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            APY
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber endingText="%" value={APY} />
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            tzBTC/BTC Price Difference
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber endingText="%" value={tzbtcBitcoinPriceDiff} />
          </CustomizedText>
        </VertInfo>
      </div>
    </LBHeaderStyled>
  )
}

export default LBHeader
