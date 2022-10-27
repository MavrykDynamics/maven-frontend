import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

import { LBActionStyled, ToggleButtonsWrapper } from './LBAction.style'
import { LBAddLiquidity } from './LBActionScreens/LBAddLiquidity.controller'
import { LBRemoveLiquidity } from './LBActionScreens/LBRemoveLiquidity.controller'
import { LBSwap } from './LBActionScreens/LBSwap.controller'
import { LBGeneralStats } from '../../LiquidityBaking.view'
import { Button } from 'app/App.components/Button/Button.controller'
import { LBChart } from '../LBChart/LBChart.controller'
import { useMedia } from 'react-use'

const FIRST_TOGGLER_VALUES = [
  {
    title: 'swap',
    value: 'swap',
  },
  {
    title: 'liquidity',
    value: 'liquidity',
    subToggler: [
      {
        title: 'add liquidity',
        value: 'add liquidity',
      },
      {
        title: 'remove liquidity',
        value: 'remove liquidity',
      },
    ],
  },
]
type LBActionProps = {
  generalDexStats: LBGeneralStats
}
export const LBAction = ({ generalDexStats }: LBActionProps) => {
  const [fBtnSelected, setFBtnSelected] = useState(FIRST_TOGGLER_VALUES[0].value as 'swap' | 'liquidity')
  const isMobile = useMedia('(max-width: 769px)')
  const [showChart, setShowChart] = useState<boolean>(false)
  const sTogglerValues = useMemo(
    () => FIRST_TOGGLER_VALUES.find(({ value }) => value === fBtnSelected)?.subToggler,
    [fBtnSelected],
  )
  const [sBtnSelected, setSBtnSelected] = useState(sTogglerValues?.[0].value || '')

  const { ready } = useSelector((state: State) => state.wallet)

  useEffect(() => {
    setSBtnSelected(sTogglerValues?.[0].value || '')
  }, [fBtnSelected, sTogglerValues])

  useEffect(() => {
    if (!isMobile) {
      setShowChart(false)
    }
  }, [isMobile])

  return (
    <LBActionStyled isShowingChartMobile={showChart}>
      {!showChart ? (
        <ToggleButtonsWrapper
          className={`action-toggle-header ${
            fBtnSelected === 'liquidity' && sBtnSelected === 'add liquidity' && !showChart ? 'addLiquidity' : ''
          } ${
            fBtnSelected === 'liquidity' && sBtnSelected === 'remove liquidity' && !showChart ? 'removeLiquidity' : ''
          }`}
        >
          <div className="top">
            <ToggleButton
              className="action-toggler main"
              values={FIRST_TOGGLER_VALUES}
              selected={fBtnSelected}
              handleSetSelectedToggler={(value: unknown) => setFBtnSelected(value as 'swap' | 'liquidity')}
            />
            {isMobile ? (
              <Button
                text={''}
                icon={showChart ? '' : 'toggleChartToArea'}
                className={`toggleChart LB toggleBlock`}
                kind="transparent"
                onClick={() => setShowChart(true)}
              />
            ) : null}
          </div>
          {sTogglerValues && sTogglerValues.length ? (
            <ToggleButton
              className="action-toggler"
              values={sTogglerValues}
              selected={sBtnSelected}
              handleSetSelectedToggler={(value: unknown) => setSBtnSelected(value as string)}
            />
          ) : null}
        </ToggleButtonsWrapper>
      ) : null}

      {fBtnSelected === 'swap' && !sBtnSelected && !showChart ? (
        <LBSwap ready={ready} generalDexStats={generalDexStats} />
      ) : null}
      {fBtnSelected === 'liquidity' && sBtnSelected === 'add liquidity' && !showChart ? (
        <LBAddLiquidity ready={ready} generalDexStats={generalDexStats} />
      ) : null}
      {fBtnSelected === 'liquidity' && sBtnSelected === 'remove liquidity' && !showChart ? (
        <LBRemoveLiquidity ready={ready} generalDexStats={generalDexStats} />
      ) : null}
      {showChart && isMobile ? (
        <LBChart className="mobile-chart" returnBackToActionScreenHandler={() => setShowChart(false)} />
      ) : null}
    </LBActionStyled>
  )
}
