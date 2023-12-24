import * as React from 'react'

import {SatellitesFrontFigure, SatellitesImage, SatellitesStyled} from './Satellites.style'
import {Parallax} from 'react-scroll-parallax'
import {useSelector} from 'react-redux'
import {LIGHT_THEME} from 'redux/actions/preferences.action'
import {State} from 'utils/interfaces'

export const SatellitesView = () => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const darkThemeEnabled = themeSelected !== LIGHT_THEME
  const satelliteImgUrl = darkThemeEnabled
    ? '/images/satellites-columns-dark.svg'
    : '/images/satellites-columns-light.svg'
  const satelliteMobileImgUrl = darkThemeEnabled
    ? '/images/satellites-mobile-dark.svg'
    : '/images/satellites-mobile-light.svg'
  const satelliteFrontImgUrl = darkThemeEnabled ? '/images/city-bg-dark.svg' : '/images/city-bg-light.svg'
  return (
    <SatellitesStyled id="satellites">
      <h2>Satellites: The Key to Maven’s Governance Structure</h2>
      <p>
        Satellites are nodes that operate the Maven platform through governance voting and providing Oracle price feed
        information.
      </p>
      <Parallax speed={-5}>
        <SatellitesImage src={satelliteImgUrl} srcMobile={satelliteMobileImgUrl} />
      </Parallax>
      <SatellitesFrontFigure>
        <img src={satelliteFrontImgUrl} alt="Satellites" />
      </SatellitesFrontFigure>
    </SatellitesStyled>
  )
}
