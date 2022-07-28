import { CustomizedText } from 'pages/LiquidityBaking/components/LBHeader/LBHeader.style'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'

import { InputKind, InputStatusType } from './Input.controller'
import {
  InputComponent,
  InputComponentContainer,
  InputErrorMessage,
  InputIcon,
  InputLabel,
  InputStatus,
  InputStyled,
} from './Input.style'

type InputViewProps = {
  icon?: string
  placeholder: string
  name?: string
  value?: string | number
  onChange: any
  onBlur: any
  onKeyDown: any
  onFocus: any
  inputStatus?: InputStatusType
  type: string
  errorMessage?: string
  disabled?: boolean
  pinnedText?: string
  required?: boolean
  kind?: InputKind
  useMaxHandler?: () => void
  userBalance?: number
}

// TODO: add input icon and coin name, add label for dynamic calculation

export const InputView = ({
  icon,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  onFocus,
  inputStatus,
  type,
  errorMessage,
  disabled,
  pinnedText,
  kind,
  required,
  useMaxHandler,
  userBalance
}: InputViewProps) => {
  let classNames = kind
  let status = inputStatus !== undefined ? inputStatus : 'none'
  classNames += ` ${status}`

  return (
    <InputStyled id={'inputStyled'}>
      {useMaxHandler ? <CustomizedText className='useMax' onClick={useMaxHandler} fontSize={14} fontWidth={600}>Use Max</CustomizedText> : null}
      {userBalance ? <CustomizedText className='balance' fontSize={14} fontWidth={600}><CommaNumber beginningText='Balance:' value={userBalance} endingText='XTZ'/></CustomizedText> : null}
      
      <InputComponentContainer>
        <InputComponent
          id={'inputComponent'}
          type={type}
          name={name}
          required={required}
          className={classNames}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          autoComplete={name}
          disabled={disabled}
        />
        <InputStatus className={`${classNames} ${pinnedText ? 'with-text' : ''}`} />
        {pinnedText && icon && (
            <>
              <InputIcon>
                <use xlinkHref={`/icons/sprites.svg#${icon}`} />
              </InputIcon>
              <InputLabel className={`${classNames} pinned-text`}>{pinnedText}</InputLabel>
            </>
        )}
      </InputComponentContainer>
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </InputStyled>
  )
}
