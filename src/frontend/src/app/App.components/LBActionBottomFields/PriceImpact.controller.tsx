import { PriceChange } from 'pages/LiquidityBaking/components/LBAction/LBAction.style'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { subHeaderColor } from 'styles'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'

export const PriceImpact = ({ priceImpact }: { priceImpact: number }) => {
  return (
    <HorisontalInfo>
      <CustomizedText color={subHeaderColor} fontWidth={500}>
        Price Impact
      </CustomizedText>

      <CustomizedText fontWidth={500}>
        <PriceChange up={priceImpact >= 0}>
          <CommaNumber
            beginningText={priceImpact === 0 ? '' : priceImpact > 0 ? '+' : '-'}
            value={priceImpact}
            showDecimal
            decimalsToShow={5}
            endingText="%"
          />
        </PriceChange>
      </CustomizedText>
    </HorisontalInfo>
  )
}
