import { Footer } from 'app/App.components/Footer/Footer.controller'
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
import { HomeParallax, HomeParallaxGroup, HomeStyled, HomeParallaxLayer, HomeParallaxPage } from './Home.style'

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
                image: '/images/parallax/layer10.svg',
                translateY: [-80, 80],
                expanded: false
              },
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
      <HomeParallaxGroup>
        <HomeParallaxLayer img="/images/parallax/layer10.svg" zIndex={1} translateZ="-800px" scale={3.75}/>
        <HomeParallaxLayer img="/images/parallax/layer8.svg" zIndex={2} translateZ="-725px" scale={3.50}/>
        <HomeParallaxLayer img="/images/parallax/layer7.svg" zIndex={3} translateZ="-675px" scale={3.25}/>
        <HomeParallaxLayer img="/images/parallax/layer6.svg" zIndex={4} translateZ="-600px" scale={3}/>
        <HomeParallaxLayer img="/images/parallax/layer5.svg" zIndex={5} translateZ="-525px" scale={2.75}/>
        <HomeParallaxLayer img="/images/parallax/layer4.svg" zIndex={6} translateZ="-400px" scale={2.33333333}/>
        <HomeParallaxLayer img="/images/parallax/layer3.svg" zIndex={7} translateZ="-250px" scale={1.833333333}/>
        <HomeParallaxLayer img="/images/parallax/layer2.svg" zIndex={8} translateZ="-125px" scale={1.4167}/>
        <HomeParallaxLayer img="/images/parallax/layer1.svg" zIndex={9} translateZ="0" scale={1.01}>
          <JumbotronView />
        </HomeParallaxLayer>
      </HomeParallaxGroup>
      <HomeParallaxPage>
        <PartnersView />
        <CalculatorView />
        <FeaturesView />
        <SatellitesView />
        <HighligthsView />
        <GovernanceView />
        <TokenomicsView />
        <NewsletterView />
      </HomeParallaxPage>
      <Footer/>
    </HomeStyled>
  )
}
