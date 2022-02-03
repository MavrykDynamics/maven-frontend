import * as React from 'react'
import { useEffect } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import { CalculatorView } from './components/Calculator/Calculator.view'
import { FeaturesView } from './components/Features/Features.view'
import { GovernanceView } from './components/Governance/Governance.view'
import { HighligthsView } from './components/Highligths/Highligths.view'
import { JumbotronView } from './components/Jumbotron/Jumbotron.view'
import { NewsletterView } from './components/Newsletter/Newsletter.view'
import { PartnersView } from './components/Partners/Partners.view'
import { SatellitesView } from './components/Satellites/Satellites.view'
import { TokenomicsView } from './components/Tokenomics/Tokenomics.view'
import { HomeStyled, HomeParallax } from './Home.style'

export const HomeView = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <HomeStyled>
      <HomeParallax>
        <ParallaxBanner
          layers={[
            {
              image: '/images/parallax/layer8.svg',
              translateY: [-70, 70],
              expanded: false
            },
            {
              image: '/images/parallax/layer7.svg',
              translateY: [-60, 60],
              expanded: false
            },
            {
              image: '/images/parallax/layer6.svg',
              translateY: [-50, 50],
              expanded: false
            },
            {
              image: '/images/parallax/layer5.svg',
              translateY: [-40, 40],
              expanded: false
            },
            {
              image: '/images/parallax/layer4.svg',
              translateY: [-30, 30],
              expanded: false
            },
            {
              image: '/images/parallax/layer3.svg',
              translateY: [-20, 20],
              expanded: false
            },
            {
              image: '/images/parallax/layer2.svg',
              translateY: [-15, 15],
              expanded: false
            },
            {
              image: '/images/parallax/layer1.svg',
              speed: 0,
            }
          ]}
          style={{'paddingBottom': '200px'}}
        >
          <JumbotronView />
        </ParallaxBanner>
      </HomeParallax>
      <PartnersView />
      <CalculatorView />
      <FeaturesView />
      <SatellitesView />
      <HighligthsView />
      <GovernanceView />
      <TokenomicsView />
      <NewsletterView />
    </HomeStyled>
  )
}
