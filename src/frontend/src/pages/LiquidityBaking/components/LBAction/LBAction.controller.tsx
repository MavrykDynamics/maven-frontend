import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import React, { useEffect, useMemo, useState } from 'react'

import { LBActionStyled, ToggleButtonsWrapper } from './LBAction.style'
import { LBAddLiquidity } from './LBActionScreens/LBAddLiquidity.controller'
import { LBGeneralStats } from './LBActionScreens/LBGeneralStats.controller'
import { LBPersonalStats } from './LBActionScreens/LBPersonalStats.controller'
import { LBRemoveLiquidity } from './LBActionScreens/LBRemoveLiquidity.controller'
import { LBSwap } from './LBActionScreens/LBSwap.controller'

const TOGGLERS_VALUES = {
  'swap': [],
  'liquidity': ['add liquidity', 'remove liquidity'],
  'stats': ['personal', 'general'],
}

export const LBAction = () => {
  const fTogglerValues = useMemo(() => Object.keys(TOGGLERS_VALUES), [])
  const [fBtnSelected, setFBtnSelected] = useState(fTogglerValues[0] as 'swap' | 'stats' | 'liquidity')

  const sTogglerValues = useMemo(() => TOGGLERS_VALUES[fBtnSelected] as Array<string>, [fBtnSelected])
  const [sBtnSelected, setSBtnSelected] = useState(sTogglerValues[0])

  useEffect(() => {
    setSBtnSelected(sTogglerValues[0] || '')
  }, [fBtnSelected])
  
  return (
    <LBActionStyled>
      <ToggleButtonsWrapper>
        <ToggleButton values={fTogglerValues} selected={fBtnSelected} handleSetSelectedToggler={(value: string) => setFBtnSelected(value as 'swap' | 'stats' | 'liquidity')} />
        {sTogglerValues.length ? <ToggleButton values={sTogglerValues} selected={sBtnSelected} handleSetSelectedToggler={setSBtnSelected} /> : null}
      </ToggleButtonsWrapper>

      {fBtnSelected === 'swap' && !sBtnSelected ? <LBSwap /> : null}
      {fBtnSelected === 'stats' && sBtnSelected === 'personal' ? <LBPersonalStats /> : null}
      {fBtnSelected === 'stats' && sBtnSelected === 'general' ? <LBGeneralStats /> : null}
      {fBtnSelected === 'liquidity' && sBtnSelected === 'add liquidity' ? <LBAddLiquidity /> : null}
      {fBtnSelected === 'liquidity' && sBtnSelected === 'remove liquidity' ? <LBRemoveLiquidity /> : null}
    </LBActionStyled>
  )
}
