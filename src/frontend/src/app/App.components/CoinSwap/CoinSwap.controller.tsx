import { CustomizedText } from 'pages/LiquidityBaking/components/LBHeader/LBHeader.style';
import React from 'react'
import { cyanColor } from 'styles';
import { CommaNumber } from '../CommaNumber/CommaNumber.controller';
import { CoinSwapCoinWrapper, CoinSwapStyled } from './CoinSwap.style'

type CoinSwapProps = {
  icon: string
  coin1Icon: string;
  coin1Name: string;
  coin2Icon: string;
  coin2Name: string;
}

export const CoinSwap = ({icon, coin1Icon, coin1Name, coin2Icon, coin2Name}: CoinSwapProps) => {
  return (
    <CoinSwapStyled>
      <CoinSwapCoinWrapper>
        <svg><use xlinkHref={`/icons/sprites.svg#${coin1Icon}`} /></svg>
        <CustomizedText fontWidth={500} color={cyanColor}><CommaNumber value={0} endingText={coin1Name}/></CustomizedText>
      </CoinSwapCoinWrapper>

      <div className="svg-wrapper">
        <svg><use xlinkHref={`/icons/sprites.svg#${icon}`} /></svg>
      </div>

      <CoinSwapCoinWrapper>
      <svg><use xlinkHref={`/icons/sprites.svg#${coin2Icon}`} /></svg>
      <CustomizedText fontWidth={500} color={cyanColor}><CommaNumber value={0} endingText={coin2Name}/></CustomizedText>
      </CoinSwapCoinWrapper>
    </CoinSwapStyled>
  )
}
