import React from 'react'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'

// hooks

// types
import { InputViewProps } from './newInput.type'

// styles
import { InputPinnedChild, InputStyledStatus, InputWrapper, NewInputLabel, StyledInput } from './NewInput.style'
import NewButton from '../NewButton/NewButton'
import { BUTTON_SIMPLE } from '../NewButton/NewButton.constants'
import { InputErrorMessage } from '../Input/Input.style'
import { useInputValidator } from 'utils/useInputValidator'

export const Input = React.forwardRef<HTMLInputElement, InputViewProps>(
  (
    {
      children,
      className,
      inputProps,
      settings: {
        balance,
        balanceAsset,
        useMaxHandler,
        balanceHandler,
        convertedValue,
        label,
        tooltip,
        balanceName = 'Balance',
        inputStatus,
        inputSize,
        errorMessage: errorMessageFromProps,
        showErrorMessage = true,
      },
    }: InputViewProps,
    ref,
  ) => {
    const { status, errorMessage, handleChange } = useInputValidator({
      originalErrorMessage: errorMessageFromProps,
      status: inputStatus,
      onChange: inputProps.onChange,
    })

    return (
      <InputWrapper className={`${className} ${status} ${inputSize}`} id={'inputStyled'}>
        {label ? (
          <NewInputLabel>
            {label}

            <>{tooltip}</>
          </NewInputLabel>
        ) : null}

        <StyledInput
          {...inputProps}
          onChange={handleChange}
          className={`${status} ${children ? 'remove-right-border-radius' : ''}`}
          autoComplete={'off'}
          ref={ref}
        />
        {Boolean(children) ? null : <InputStyledStatus className={`${status} ${inputSize}`} />}

        {balance !== undefined && balanceAsset ? (
          <div onClick={balanceHandler}>
            <CommaNumber
              value={balance}
              beginningText={`${balanceName}: `}
              endingText={balanceAsset}
              className={`input-balance ${balanceHandler ? 'pointer' : ''}`}
            />
          </div>
        ) : null}

        {useMaxHandler ? (
          <div className="useMax-btn">
            <NewButton onClick={useMaxHandler} kind={BUTTON_SIMPLE}>
              Use Max
            </NewButton>
          </div>
        ) : null}

        {convertedValue !== undefined ? (
          <CommaNumber value={convertedValue} beginningText={'= $'} className={'input-converted-amount'} />
        ) : null}

        {children && <InputPinnedChild className="pinned-child">{children}</InputPinnedChild>}
        {errorMessage && showErrorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
      </InputWrapper>
    )
  },
)
