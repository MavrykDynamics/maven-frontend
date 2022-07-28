import * as React from 'react'

import { ToggleButtonItem, ToggleButtonWrapper } from './Toggle-button.style'

type ToggleButtonViewProps = {
  values: string[]
  selected: string
  handleSetSelectedToggler: (arg0: string) => void
  className?: string
}

export const ToggleButton = ({ values, selected, handleSetSelectedToggler, className }: ToggleButtonViewProps) => {
  return (
    <ToggleButtonWrapper className={className}>
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
