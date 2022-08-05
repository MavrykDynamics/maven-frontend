import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor } from 'styles'
import { CoinSwapCoinWrapper, CoinSwapStyled } from './CoinSwap.style'

import { CommaNumber } from '../CommaNumber/CommaNumber.controller'

type CoinDataType = {
  icon: string
  amount: number
}

type CoinSwapProps = {
  icon: { name: string; width: number; height: number }
  XTZCoinData: CoinDataType
  tzBTCCoinData: CoinDataType
}

export const CoinSwap = ({ icon, XTZCoinData, tzBTCCoinData }: CoinSwapProps) => {
  return (
    <CoinSwapStyled>
      <CoinSwapCoinWrapper>
        <svg>
          <use xlinkHref={`/icons/sprites.svg#${XTZCoinData.icon}`} />
        </svg>
        <CustomizedText fontWidth={500} color={cyanColor}>
          <CommaNumber value={XTZCoinData.amount} endingText={'XTZ'} />
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
        <CustomizedText fontWidth={500} color={cyanColor}>
          <CommaNumber value={tzBTCCoinData.amount} endingText={'tzBTC'} />
        </CustomizedText>
      </CoinSwapCoinWrapper>
    </CoinSwapStyled>
  )
}
