import * as React from 'react'

import { SatellitesImage, SatellitesStyled } from './Satellites.style'
import { Parallax } from 'react-scroll-parallax'
import { useSelector } from 'react-redux';

export const SatellitesView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
  const satelliteImgUrl = darkThemeEnabled ? '/images/satellites-dark.svg' : '/images/satellites-light.svg'
  const satelliteMobileImgUrl = darkThemeEnabled ? '/images/satellites-mobile-dark.svg' : '/images/satellites-mobile-light.svg'
  return (
    <SatellitesStyled id="satellites">
      <h1>Satellites: Decentralized Governance & Oracles</h1>
      <Parallax speed={-5}>
        <SatellitesImage src={satelliteImgUrl} srcMobile={satelliteMobileImgUrl}/>
      </Parallax>
    </SatellitesStyled>
  )
}
