import React, { useEffect, useState, useCallback } from 'react'
import { SlidingTabButtonsView } from './SlidingTabButtons.view'

export interface TabItem {
  text: string
  id: number
  active: boolean
  isDisabled?: boolean
}

type SlidingTabButtonsProps = {
  className?: string
  onClick: (tabId: number) => void
  disableAll?: boolean
  tabItems: TabItem[]
  disabled?: boolean
}

export const SlidingTabButtons = ({
  onClick,
  className = '',
  tabItems = [],
  disableAll = false,
  disabled = false,
}: SlidingTabButtonsProps) => {
  // if we found active item by default set it, othervise set first item active, if it's not disabled
  const [activeTab, setActiveTab] = useState<number | undefined>(
    tabItems.find(({ active, isDisabled }) => active && !isDisabled)?.id ?? tabItems[0]?.isDisabled
      ? tabItems[0]?.id
      : undefined,
  )

  useEffect(() => {
    if (disableAll) {
      setActiveTab(undefined)
    }
  }, [disableAll])

  const clickHandler = useCallback((tabId: number) => {
    if (disabled) return
    setActiveTab(tabId)
    onClick(tabId)
  }, [disabled, onClick])

  return (
    <SlidingTabButtonsView
      className={`${className}${disabled ? ' disabled' : ''}`}
      onClick={clickHandler}
      activeTab={activeTab}
      tabValues={tabItems}
    />
  )
}
