import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import React from 'react'
import { ChartStyled } from './LBChart.style'

export const LBChart = () => {
  return (
    <ChartStyled>
      LBChart
      <ConnectWallet />
    </ChartStyled>
  )
}
