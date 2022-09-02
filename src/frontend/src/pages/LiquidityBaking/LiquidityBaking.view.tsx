import LBFAQ from './components/FAQ/FAQ.controller'
import { LBAction } from './components/LBAction/LBAction.controller'
import { LBChart } from './components/LBChart/LBChart.controller'
import LBHeader from './components/LBHeader/LBHeader.controller'
import { LBPersonalStats } from './components/LBPersonalStats/LBPersonalStats.controller'

const LiquidityBakingView = () => {
  return (
    <div className="content-wrapper">
      <LBHeader />
      <div className="middle-block">
        <LBPersonalStats />
        <LBAction />
      </div>
      <LBChart />
      <LBFAQ />
    </div>
  )
}

export default LiquidityBakingView
