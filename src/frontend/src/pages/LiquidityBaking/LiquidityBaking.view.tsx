import { scroll } from 'actions'
import { Footer } from 'app/App.components/Footer/Footer.controller'
import { ParallaxView } from 'pages/Home/components/Parallax/Parallax.view'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import LBFAQ from './components/FAQ/FAQ.controller'
import { LBAction } from './components/LBAction/LBAction.controller'
import { LBChart } from './components/LBChart/LBChart.controller'
import LBHeader from './components/LBHeader/LBHeader.controller'
import { LBStyled } from './LiquidityBaking.styles'

const LiquidityBakingView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const onScroll = (e: any) => {
    dispatch(scroll(e.target.scrollTop))
  }

  return (
    <LBStyled onScroll={onScroll}>
      <ParallaxView className="lb">
        <div className="content-wrapper">
          <LBHeader />
          <LBAction />
          <LBChart />
          <LBFAQ />
        </div>
      </ParallaxView>
      <Footer />
    </LBStyled>
  )
}

export default LiquidityBakingView
