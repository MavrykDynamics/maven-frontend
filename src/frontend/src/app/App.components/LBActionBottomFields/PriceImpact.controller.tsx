import { PriceChange } from 'pages/LiquidityBaking/components/LBAction/LBAction.style'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { subHeaderColor } from 'styles'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import Icon from '../Icon/Icon.view'

export const PriceImpact = ({ priceImpact }: { priceImpact: number }) => {
  const value = priceImpact > 0.04 ? '> 4%' : priceImpact > 0.005 && priceImpact <= 0.04 ? '1.2-2%' : '< 0.5%'
  const isGreen = priceImpact <= 0.04
  return (
    <HorisontalInfo>
      <CustomizedText color={subHeaderColor} fontWidth={500}>
        Price Impact
        <div className="info">
          <Icon id="infoIcon" />
          <div className="text">
            The impact your transaction is expected to make on the exchange rate. The size of your swap relative to the
            size of the pool determines the impact. Note: This impact is what you are accepting in addition to the
            slippage.
          </div>
        </div>
      </CustomizedText>

      <CustomizedText fontWidth={500}>
        <PriceChange up={isGreen}>{value}</PriceChange>
      </CustomizedText>
    </HorisontalInfo>
  )
}
