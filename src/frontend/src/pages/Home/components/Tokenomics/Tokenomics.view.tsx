import * as React from 'react'
import { useSelector } from 'react-redux'

import { TokenomicsStyled } from './Tokenomics.style'

export const TokenomicsView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const tokenomicsUrl = darkThemeEnabled ? '/images/tokenomics-dark.svg' : '/images/tokenomics-light.svg'
  const tokenomicsMobileUrl = '/images/tokenomics-mobile.svg'

  return (
    <TokenomicsStyled id="tokenomics">
      <h2>Tokenomics</h2>
      <picture>
        <source srcSet={tokenomicsUrl} media="(min-width: 769px)" />
        <source srcSet={tokenomicsMobileUrl} media="(max-width: 768px)" />
        <img loading="lazy" src={tokenomicsUrl} alt="Tokenomics" />
      </picture>
    </TokenomicsStyled>
  )
}
