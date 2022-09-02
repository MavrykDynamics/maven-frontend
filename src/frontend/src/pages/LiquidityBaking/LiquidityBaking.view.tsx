import { Footer } from 'app/App.components/Footer/Footer.controller'
import LBFAQ from './components/FAQ/FAQ.controller'
import { LBAction } from './components/LBAction/LBAction.controller'
import { LBChart } from './components/LBChart/LBChart.controller'
import LBHeader from './components/LBHeader/LBHeader.controller'
import { LBPersonalStats } from './components/LBPersonalStats/LBPersonalStats.controller'

import { LBStyled } from './LiquidityBaking.styles'

const LiquidityBakingView = () => {
  return (
    <LBStyled>
      <div className="content-wrapper">
        <LBHeader />
        <div className="middle-block">
          <LBPersonalStats />
          <LBAction />
        </div>
        <LBChart />
        <LBFAQ />
      </div>
      <Footer />
    </LBStyled>
  )
}

export default LiquidityBakingView
