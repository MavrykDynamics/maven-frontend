import React from 'react'

import { CustomizedText, LBHeaderStyled, VertInfo } from './LBHeader.style'

const LBHeader = () => {
  return (
    <LBHeaderStyled>
      <div className="title">
        <svg><use xlinkHref='/icons/sprites.svg#LBLogo' /></svg>
        <CustomizedText fontWidth={700} fontSize={35}>Liquidity Baking</CustomizedText>
      </div>

      <VertInfo>
        <CustomizedText fontWidth={500}>Total Value Locked</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={700} fontSize={25}>$12,613,873</CustomizedText>
      </VertInfo>

      <VertInfo>
      <CustomizedText fontWidth={500}>APY</CustomizedText>
      <CustomizedText color='#86D4C9' fontWidth={700} fontSize={25}>28.5%</CustomizedText>
      </VertInfo>
      
      <VertInfo>
      <CustomizedText fontWidth={500}>tzBTC/BTC Price Difference</CustomizedText>
      <CustomizedText color='#86D4C9' fontWidth={700} fontSize={25}>0.16%</CustomizedText>
      </VertInfo>
    </LBHeaderStyled>
  )
}

export default LBHeader