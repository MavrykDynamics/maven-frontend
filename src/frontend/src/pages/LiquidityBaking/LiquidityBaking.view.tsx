import { Footer } from 'app/App.components/Footer/Footer.controller'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { toggleRPCNodePopup } from 'app/App.components/SettingsPopup/SettingsPopup.actions'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import LBFAQ from './components/FAQ/FAQ.controller'
import { LBAction } from './components/LBAction/LBAction.controller'
import { LBChart } from './components/LBChart/LBChart.controller'
import LBHeader from './components/LBHeader/LBHeader.controller'
import { LBPersonalStats } from './components/LBPersonalStats/LBPersonalStats.controller'

import { LBStyled } from './LiquidityBaking.styles'

const LiquidityBakingView = () => {
  const dispatch = useDispatch()
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])
  return (
    <LBStyled>
      <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
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
