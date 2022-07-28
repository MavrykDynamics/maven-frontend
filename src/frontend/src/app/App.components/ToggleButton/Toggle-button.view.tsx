import * as React from 'react'

import { ToggleButtonItem, ToggleButtonWrapper } from './Toggle-button.style'

type ToggleButtonViewProps = {
  values: string[]
  selected: string
  handleSetSelectedToggler: (arg0: string) => void
}

export const ToggleButton = ({ values, selected, handleSetSelectedToggler }: ToggleButtonViewProps) => {
  return (
    <ToggleButtonWrapper>
      {values.map((item) => (
        <ToggleButtonItem
          key={item}
          className={`${selected === item ? 'selected' : ''} toggle-btn`}
          onClick={() => handleSetSelectedToggler(item)}
        >
          {item}
        </ToggleButtonItem>
      ))}
    </ToggleButtonWrapper>
  )
}
