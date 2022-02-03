import * as React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import { GovernanceContent, GovernanceGrid, GovernanceImage, GovernanceStyled } from './Governance.style'

export const GovernanceView = () => {
  return (
    <GovernanceStyled>
      <GovernanceContent>
        <h1>Cycle of Governance & Oracle</h1>
        <ParallaxBanner
            layers={[
              {
                image: '/images/governance-cycle/governance-3.svg',
                translateY: [15,5, 'easeOutQuad'],
                // scale: [0.8,0.8],
              },
              {
                image: '/images/governance-cycle/governance-2.svg',
                // scale: [0.8,0.8],
              },
              {
                image: '/images/governance-cycle/governance-1.svg',
                translateY: [-15,-5, 'easeOutQuad'],
                // speed: -15,
                // scale: [0.8,0.8],
              }
            ]}
            style={{ aspectRatio: '1.8/1'}}
          />
      </GovernanceContent>
    </GovernanceStyled>
  )
}
