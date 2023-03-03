import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import Icon from '../Icon/Icon.view'

export const MinimumReceived = ({
  minimumReceived,
  className,
}: {
  minimumReceived: Array<{
    value: number
    tokenName: string
  }>
  className?: string
}) => {
  let decimals = 0
  switch (minimumReceived?.[0].tokenName) {
    case 'tzBTC':
      decimals = 8
      break
    case 'lqt':
      decimals = 9
      break
    default:
      decimals = 4
      break
  }
  return (
    <HorisontalInfo className={className}>
      <CustomizedText className={PRIMARY_COLOR} fontWidth={500} style={{ whiteSpace: 'pre', marginRight: '15px' }}>
        Minimum Received
        <div className="info">
          <Icon id="infoIcon" />
          <div className="text">
            The minimum amount you are guaranteed to receive. If the exchange rate changes unfavorably such that you can
            no longer receive at least this amount, then your transaction will not be completed.
          </div>
        </div>
      </CustomizedText>

      <CustomizedText className={SECONDARY_COLOR} fontWidth={500} style={{ columnGap: '7px' }}>
        {minimumReceived.map(({ value, tokenName }, idx) => (
          <div style={{ display: 'contents' }} key={value + tokenName}>
            <CommaNumber value={value} endingText={tokenName} decimalsToShow={decimals} />
            {minimumReceived.length > 1 && idx < minimumReceived.length - 1 ? ' + ' : ''}
          </div>
        ))}
      </CustomizedText>
    </HorisontalInfo>
  )
}
