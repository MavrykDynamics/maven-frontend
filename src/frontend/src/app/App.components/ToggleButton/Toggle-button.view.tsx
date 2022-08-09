import * as React from 'react'

import { ToggleButtonItem, ToggleButtonWrapper } from './Toggle-button.style'

type ToggleButtonViewProps = {
  values: { title: string; value: string | number }[]
  selected: string | number
  handleSetSelectedToggler: (arg0: string | number) => void
  className?: string
}

export const ToggleButton = ({ values, selected, handleSetSelectedToggler, className }: ToggleButtonViewProps) => {
  return (
    <ToggleButtonWrapper className={className}>
      {values.map(({ title, value }) => (
        <ToggleButtonItem
          key={value}
          className={`${selected === value ? 'selected' : ''} toggle-btn`}
          onClick={() => handleSetSelectedToggler(value)}
        >
          {title}
        </ToggleButtonItem>
      ))}
    </ToggleButtonWrapper>
  )
}
