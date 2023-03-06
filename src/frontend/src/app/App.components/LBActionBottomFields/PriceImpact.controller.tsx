import React from 'react'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import Icon from '../Icon/Icon.view'

export const PriceImpact = ({ priceImpact }: { priceImpact: number }) => {
  const value = priceImpact > 0.04 ? '> 4%' : priceImpact > 0.005 && priceImpact <= 0.04 ? '1.2-2%' : '< 0.5%'
  const isGreen = priceImpact <= 0.04

  return (
    <HorisontalInfo>
      <CustomizedText className={PRIMARY_COLOR} fontWidth={500}>
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

      <CustomizedText className={SECONDARY_COLOR} fontWidth={500}>
        {value} 
      </CustomizedText>
    </HorisontalInfo>
  )
}
