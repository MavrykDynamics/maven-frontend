import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { CoinSwapCoinWrapper, CoinSwapStyled } from './CoinSwap.style'

import { CommaNumber } from '../CommaNumber/CommaNumber.controller'

type CoinDataType = {
  icon: string
  amount: number
}

type CoinSwapProps = {
  icon: { name: string; width: number | string; height: number | string }
  XTZCoinData: CoinDataType
  tzBTCCoinData: CoinDataType
  className?: string
}

export const CoinSwap = ({ icon, XTZCoinData, tzBTCCoinData, className }: CoinSwapProps) => {
  return (
    <CoinSwapStyled className={className}>
      <CoinSwapCoinWrapper>
        <svg>
          <use xlinkHref={`/icons/sprites.svg#${XTZCoinData.icon}`} />
        </svg>
        <CustomizedText fontWidth={500} className={SECONDARY_COLOR}>
          <CommaNumber value={XTZCoinData.amount} showDecimal decimalsToShow={6} endingText={'XTZ'} />
        </CustomizedText>
      </CoinSwapCoinWrapper>

      <div className="svg-wrapper">
        <svg style={{ width: `${icon.width}px`, height: `${icon.height}px` }}>
          <use xlinkHref={`/icons/sprites.svg#${icon.name}`} />
        </svg>
      </div>

      <CoinSwapCoinWrapper>
        <svg>
          <use xlinkHref={`/icons/sprites.svg#${tzBTCCoinData.icon}`} />
        </svg>
        <CustomizedText fontWidth={500} className={SECONDARY_COLOR}>
          <CommaNumber value={tzBTCCoinData.amount} showDecimal decimalsToShow={6} endingText={'tzBTC'} />
        </CustomizedText>
      </CoinSwapCoinWrapper>
    </CoinSwapStyled>
  )
}
