import { scroll } from 'redux/actions/preferences.action'
import { Footer } from 'app/App.components/Footer/Footer.controller'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppFeaturesView } from './components/AppFeatures/AppFeatures.view'
import { CalculatorView } from './components/Calculator/Calculator.view'
import { FeaturesView } from './components/Features/Features.view'
import { IdeasView } from './components/Ideas/Ideas.view'
import { JumbotronView } from './components/Jumbotron/Jumbotron.view'
import { NewsletterView } from './components/Newsletter/Newsletter.view'
import { ParallaxView } from './components/Parallax/Parallax.view'
import { PartnersView } from './components/Partners/Partners.view'
import { RoadmapView } from './components/Roadmap/Roadmap.view'
import { SatellitesView } from './components/Satellites/Satellites.view'
import { TeamView } from './components/Team/Team.view'
import { TokenomicsView } from './components/Tokenomics/Tokenomics.view'
import { WhatMakesView } from './components/WhatMakes/WhatMakes.view'
import { HomeNoParallax, HomeStyled } from './Home.style'
import { State } from 'utils/interfaces'

export const HomeView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const onScroll = (e: any) => {
    dispatch(scroll(e.target.scrollTop))
  }

  return (
    <HomeStyled onScroll={onScroll}>
      <ParallaxView>
        <JumbotronView />
      </ParallaxView>
      <HomeNoParallax>
        <PartnersView />
        <WhatMakesView />
        <CalculatorView />
        <FeaturesView />
        <AppFeaturesView />
        <SatellitesView />
        <TokenomicsView />
        <TeamView />
        {/* <IdeasView /> */}
        <RoadmapView />
        <div id="newsletter">
          <NewsletterView />
        </div>
      </HomeNoParallax>
      <Footer />
    </HomeStyled>
  )
}
