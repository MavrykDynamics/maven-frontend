import { LBHeaderStyled } from './LBHeader.style'
import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { calculateAPY, diffBetweenCoinsInPercent } from 'utils/utils'
import { useEffect, useMemo, useState } from 'react'
import { PRIMARY_COLOR, THIRD_COLOR, SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'

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
        <CustomizedText className={PRIMARY_COLOR}>The Liquidity Baking DEX</CustomizedText>
      </div>

      <div className="info-wrapper">
        <VertInfo className='header'>
          <CustomizedText className={`${THIRD_COLOR} block-name`}>
            Total Value Locked
          </CustomizedText>
          <CustomizedText className={SECONDARY_COLOR}>
            <CommaNumber beginningText="$" value={xtz_pool * 2 * coinPrices.tezos.usd} />
          </CustomizedText>
        </VertInfo>

        <VertInfo className='header'>
          <CustomizedText className={`${THIRD_COLOR} block-name`}>
            APY
          </CustomizedText>
          <CustomizedText className={SECONDARY_COLOR}>
            <CommaNumber endingText="%" value={isFinite(APY) ? APY : 0} />
          </CustomizedText>
        </VertInfo>

        <VertInfo className='header'>
          <CustomizedText className={`${THIRD_COLOR} block-name`}>
            Total Sirius Tokens
          </CustomizedText>
          <CustomizedText className={SECONDARY_COLOR}>
            <CommaNumber value={lqt_total} />
          </CustomizedText>
        </VertInfo>

        <VertInfo className='header'>
          <CustomizedText className={`${THIRD_COLOR} block-name`}>
            tzBTC/BTC Price Difference
          </CustomizedText>
          <CustomizedText className={SECONDARY_COLOR}>
            <CommaNumber endingText="%" value={priceDifference} />
          </CustomizedText>
        </VertInfo>
      </div>
    </LBHeaderStyled>
  )
}

export default LBHeader
