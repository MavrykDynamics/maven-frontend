import { cyanColor } from 'styles'
import { LBHeaderStyled } from './LBHeader.style'
import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { calculateAPY, diffBetweenCoinsInPercent } from 'utils/utils'
import { useEffect, useMemo, useState } from 'react'

const LBHeader = () => {
  const {
    lbData: { xtz_pool, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const [priceDifference, setPriceDifference] = useState<number>(0)

  useEffect(() => {
    const calculatedDiff = diffBetweenCoinsInPercent(Number(coinPrices.tzbtc.usd), coinPrices.bitcoin.usd)
    setPriceDifference(isNaN(calculatedDiff) ? 0 : calculatedDiff)
  }, [coinPrices.bitcoin.usd, coinPrices.tzbtc.usd, priceDifference])

  const APY = useMemo(() => calculateAPY(xtz_pool), [xtz_pool])
  return (
    <LBHeaderStyled>
      <div className="title">
        <img src="/images/sirius-icon.png" alt="sirius logo" />
        <CustomizedText fontWidth={700} fontSize={30}>
          Liquidity Baking DEX (Sirius)
        </CustomizedText>
      </div>

      <div className="info-wrapper">
        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            Total Value Locked
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={23}>
            <CommaNumber beginningText="$" value={xtz_pool * 2 * coinPrices.tezos.usd} />
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            APY
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={23}>
            <CommaNumber endingText="%" value={isFinite(APY) ? APY : 0} />
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            Total Sirius Tokens
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={23}>
            <CommaNumber value={lqt_total} />
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText fontWidth={500} className="block-name">
            tzBTC/BTC Price Difference
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={23}>
            <CommaNumber endingText="%" value={priceDifference} />
          </CustomizedText>
        </VertInfo>
      </div>
    </LBHeaderStyled>
  )
}

export default LBHeader
