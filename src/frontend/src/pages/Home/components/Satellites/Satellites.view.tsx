import * as React from 'react'

import { SatellitesImage, SatellitesStyled } from './Satellites.style'
import { Parallax } from 'react-scroll-parallax'

export const SatellitesView = () => {
  return (
    <SatellitesStyled id="satellites">
      <h1>Satellites: Decentralized Governance & Oracles</h1>
      <Parallax speed={-5}>
        <SatellitesImage />
      </Parallax>
    </SatellitesStyled>
  )
}
