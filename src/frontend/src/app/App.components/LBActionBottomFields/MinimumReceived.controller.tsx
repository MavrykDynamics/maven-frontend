import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { subHeaderColor, cyanColor } from 'styles'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import Icon from '../Icon/Icon.view'

export const MinimumReceived = ({
  minimumRecived,
}: {
  minimumRecived: Array<{
    value: number
    tokenName: string
  }>
}) => {
  return (
    <HorisontalInfo>
      <CustomizedText color={subHeaderColor} fontWidth={500}>
        Minimum Received
        <div className="info">
          <Icon id="infoIcon" />
          <div className="text">
            The minimum amount you are guaranteed to receive. If the exchange rate changes unfavorably such that you can
            no longer receive at least this amount, then your transaction will not be completed.
          </div>
        </div>
      </CustomizedText>

      <CustomizedText color={cyanColor} fontWidth={500} style={{ columnGap: '7px' }}>
        {minimumRecived.map(({ value, tokenName }, idx) => (
          <div style={{ display: 'contents' }} key={value + tokenName}>
            <CommaNumber value={value} endingText={tokenName} />
            {minimumRecived.length > 1 && idx < minimumRecived.length - 1 ? ' + ' : ''}
          </div>
        ))}
      </CustomizedText>
    </HorisontalInfo>
  )
}
