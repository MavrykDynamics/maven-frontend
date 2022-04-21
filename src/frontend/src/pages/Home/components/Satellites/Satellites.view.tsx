import * as React from 'react'

import { SatellitesImage, SatellitesStyled, SatellitesFrontFigure } from './Satellites.style'
import { Parallax } from 'react-scroll-parallax'
import { useSelector } from 'react-redux'

export const SatellitesView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const satelliteImgUrl = darkThemeEnabled
    ? '/images/satellites-columns-dark.svg'
    : '/images/satellites-columns-light.svg'
  const satelliteMobileImgUrl = darkThemeEnabled
    ? '/images/satellites-mobile-dark.svg'
    : '/images/satellites-mobile-light.svg'
  const satelliteFrontImgUrl = darkThemeEnabled ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'
  return (
    <SatellitesStyled id="satellites">
      <h2>Satellites: The Key to Mavryk’s Governance Structure</h2>
      <p>
        Satellites are nodes that administer the Mavryk platform through governance voting and providing Oracle price
        feed information.
      </p>
      <Parallax speed={-5}>
        <SatellitesImage src={satelliteImgUrl} srcMobile={satelliteMobileImgUrl} />
      </Parallax>
      <SatellitesFrontFigure>
        <img loading="lazy" src={satelliteFrontImgUrl} alt="Satellites" />
      </SatellitesFrontFigure>
    </SatellitesStyled>
  )
}
