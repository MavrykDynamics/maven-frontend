import * as React from 'react'
import { useSelector } from 'react-redux'
import { TokenomicsImage, TokenomicsStyled } from './Tokenomics.style'

export const TokenomicsView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
  const tokenomicsUrl = darkThemeEnabled ? "/images/tokenomics-dark.svg" : "/images/tokenomics-light.svg";

  return (
    <TokenomicsStyled id="tokenomics">
      <h1>Tokenomics</h1>
      <TokenomicsImage src={tokenomicsUrl}/>
    </TokenomicsStyled>
  )
}
