import * as React from 'react'

import { InputView } from './Input.view'

export type InputStatusType = 'success' | 'error' | '' | undefined
export type InputKind = 'primary' | 'search' | 'LB'

type InputProps = {
  icon?: string
  placeholder: string
  name?: string
  value?: string | number
  onChange: any
  onBlur?: any
  onFocus?: any
  onKeyDown?: any
  inputStatus?: InputStatusType
  type: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  pinnedText?: string
  kind?: InputKind
  useMaxHandler?: () => void
  userBalance?: number
}

export const Input = ({
  icon,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  inputStatus,
  type,
  errorMessage,
  disabled,
  pinnedText,
  kind,
  required,
  useMaxHandler,
  userBalance,
}: InputProps) => {
  return (
    <InputView
      type={type}
      icon={icon}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      inputStatus={inputStatus}
      errorMessage={errorMessage}
      disabled={disabled}
      pinnedText={pinnedText}
      kind={kind}
      useMaxHandler={useMaxHandler}
      userBalance={userBalance}
    />
  )
}
