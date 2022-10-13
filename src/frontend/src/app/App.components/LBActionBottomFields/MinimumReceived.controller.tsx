import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { useMedia } from 'react-use'
import { subHeaderColor, cyanColor } from 'styles'
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
      decimals = 6
      break
  }
  const isMobile = useMedia('(max-width: 600px)')
  return (
    <HorisontalInfo className={className}>
      <CustomizedText color={subHeaderColor} fontWidth={500} style={{ whiteSpace: 'pre', marginRight: '15px' }}>
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
        {minimumReceived.map(({ value, tokenName }, idx) => (
          <div style={{ display: 'contents' }} key={value + tokenName}>
            <CommaNumber
              value={value}
              endingText={tokenName}
              decimalsToShow={decimals}
              maxSymbols={6}
              useMaxSymbols={isMobile}
            />
            {minimumReceived.length > 1 && idx < minimumReceived.length - 1 ? ' + ' : ''}
          </div>
        ))}
      </CustomizedText>
    </HorisontalInfo>
  )
}
