import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

import { LBActionStyled, ToggleButtonsWrapper } from './LBAction.style'
import { LBAddLiquidity } from './LBActionScreens/LBAddLiquidity.controller'
import { LBGeneralStats } from './LBActionScreens/LBGeneralStats.controller'
import { LBPersonalStats } from './LBActionScreens/LBPersonalStats.controller'
import { LBRemoveLiquidity } from './LBActionScreens/LBRemoveLiquidity.controller'
import { LBSwap } from './LBActionScreens/LBSwap.controller'

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
        title: 'remove liquidity',
        value: 'remove_liquidity',
      },
      {
        title: 'add liquidity',
        value: 'add_liquidity',
      },
    ],
  },
  {
    title: 'stats',
    value: 'stats',
    subToggler: [
      {
        title: 'general',
        value: 'stats_general',
      },
      {
        title: 'personal',
        value: 'stats_personal',
      },
    ],
  },
]

export const LBAction = () => {
  const [fBtnSelected, setFBtnSelected] = useState(FIRST_TOGGLER_VALUES[0].value as 'swap' | 'stats' | 'liquidity')

  const sTogglerValues = useMemo(() => FIRST_TOGGLER_VALUES.find(({ value }) => value === fBtnSelected)?.subToggler, [
    fBtnSelected,
  ])
  const [sBtnSelected, setSBtnSelected] = useState(sTogglerValues?.[0].value || '')

  const { ready } = useSelector((state: State) => state.wallet)

  useEffect(() => {
    setSBtnSelected(sTogglerValues?.[0].value || '')
  }, [fBtnSelected])

  return (
    <LBActionStyled>
      <ToggleButtonsWrapper className="action-toggle-header">
        <ToggleButton
          values={FIRST_TOGGLER_VALUES}
          selected={fBtnSelected}
          handleSetSelectedToggler={(value: unknown) => setFBtnSelected(value as 'swap' | 'stats' | 'liquidity')}
        />
        {sTogglerValues && sTogglerValues.length ? (
          <ToggleButton
            values={sTogglerValues}
            selected={sBtnSelected}
            handleSetSelectedToggler={(value: unknown) => setSBtnSelected(value as string)}
          />
        ) : null}
      </ToggleButtonsWrapper>

      {fBtnSelected === 'swap' && !sBtnSelected ? <LBSwap ready={ready} /> : null}
      {fBtnSelected === 'stats' && sBtnSelected === 'personal' ? <LBPersonalStats /> : null}
      {fBtnSelected === 'stats' && sBtnSelected === 'general' ? <LBGeneralStats /> : null}
      {fBtnSelected === 'liquidity' && sBtnSelected === 'add liquidity' ? <LBAddLiquidity /> : null}
      {fBtnSelected === 'liquidity' && sBtnSelected === 'remove liquidity' ? <LBRemoveLiquidity /> : null}
    </LBActionStyled>
  )
}
