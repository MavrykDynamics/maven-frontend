import { Footer } from 'app/App.components/Footer/Footer.controller'
import * as React from 'react'
import { useEffect } from 'react'

import { ParallaxView } from './components/Parallax/Parallax.view'
import { CalculatorView } from './components/Calculator/Calculator.view'
import { FeaturesView } from './components/Features/Features.view'
import { GovernanceView } from './components/Governance/Governance.view'
import { HighligthsView } from './components/Highligths/Highligths.view'
import { NewsletterView } from './components/Newsletter/Newsletter.view'
import { PartnersView } from './components/Partners/Partners.view'
import { SatellitesView } from './components/Satellites/Satellites.view'
import { TokenomicsView } from './components/Tokenomics/Tokenomics.view'
import { HomeStyled, HomeNoParallax } from './Home.style'

export const HomeView = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <HomeStyled>
      <ParallaxView/>
      <HomeNoParallax>
        <PartnersView />
        <CalculatorView />
        <FeaturesView />
        <SatellitesView />
        <HighligthsView />
        <GovernanceView />
        <TokenomicsView />
        <NewsletterView />
      </HomeNoParallax>
      <Footer/>
    </HomeStyled>
  )
}
