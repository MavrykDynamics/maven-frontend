import { cyanColor } from 'styles'
import { LBHeaderStyled } from './LBHeader.style'
import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { calculateAPY, diffBetweenCoinsInPersent } from 'utils/utils'

const LBHeader = () => {
  const {
    lbData: { xtz_pool, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const tzbtcBitcoinPriceDiff = diffBetweenCoinsInPersent(coinPrices.tzbtc.usd, coinPrices.bitcoin.usd)

  const APY = calculateAPY(xtz_pool)
  return (
    <LBHeaderStyled>
      <div className="title">
        <img src="/images/sirius-icon.png" alt="" />
        <CustomizedText fontWidth={700} fontSize={35} color={'#fff'}>
          Liquidity Baking (Sirius)
        </CustomizedText>
      </div>

      <div className="info-wrapper">
        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            Total Value Locked
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber beginningText="$" value={xtz_pool * 2 * coinPrices.tezos.usd} />
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
        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            Total Sirius Tokens
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={lqt_total} />
          </CustomizedText>
        </VertInfo>
      </div>
    </LBHeaderStyled>
  )
}

export default LBHeader
