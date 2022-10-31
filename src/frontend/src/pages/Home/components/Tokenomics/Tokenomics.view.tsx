import * as React from 'react'
import { useSelector } from 'react-redux'
import { DARK_THEME, LIGHT_THEME } from 'redux/actions/preferences.action'
import { State } from 'utils/interfaces'

import { TokenomicsStyled } from './Tokenomics.style'

export const TokenomicsView = () => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const darkThemeEnabled = themeSelected !== LIGHT_THEME

  const tokenomicsUrl = darkThemeEnabled ? '/images/tokenomics-dark.svg' : '/images/tokenomics-light.svg'
  const tokenomicsMobileUrl = darkThemeEnabled
    ? '/images/tokenomics-mobile-dark.svg'
    : '/images/tokenomics-mobile-light.svg'

  return (
    <TokenomicsStyled id="tokenomics">
      <h2>Tokenomics</h2>
      <picture>
        <source srcSet={tokenomicsUrl} media="(min-width: 769px)" />
        <source srcSet={tokenomicsMobileUrl} media="(max-width: 768px)" />
        <img src={tokenomicsUrl} alt="Tokenomics" />
      </picture>
    </TokenomicsStyled>
  )
}
