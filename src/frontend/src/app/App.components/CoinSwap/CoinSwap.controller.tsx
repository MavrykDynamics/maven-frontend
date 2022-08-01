import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor } from 'styles'
import { CoinSwapCoinWrapper, CoinSwapStyled } from './CoinSwap.style'

import { CommaNumber } from '../CommaNumber/CommaNumber.controller'

type CoinSwapProps = {
  icon: { name: string; width: number; height: number }
  coin1Icon: string
  coin1Name: string
  coin2Icon: string
  coin2Name: string
}

export const CoinSwap = ({ icon, coin1Icon, coin1Name, coin2Icon, coin2Name }: CoinSwapProps) => {
  return (
    <CoinSwapStyled>
      <CoinSwapCoinWrapper>
        <svg>
          <use xlinkHref={`/icons/sprites.svg#${coin1Icon}`} />
        </svg>
        <CustomizedText fontWidth={500} color={cyanColor}>
          <CommaNumber value={0} endingText={coin1Name} />
        </CustomizedText>
      </CoinSwapCoinWrapper>

      <div className="svg-wrapper">
        <svg style={{ width: `${icon.width}px`, height: `${icon.height}px` }}>
          <use xlinkHref={`/icons/sprites.svg#${icon.name}`} />
        </svg>
      </div>

      <CoinSwapCoinWrapper>
        <svg>
          <use xlinkHref={`/icons/sprites.svg#${coin2Icon}`} />
        </svg>
        <CustomizedText fontWidth={500} color={cyanColor}>
          <CommaNumber value={0} endingText={coin2Name} />
        </CustomizedText>
      </CoinSwapCoinWrapper>
    </CoinSwapStyled>
  )
}
