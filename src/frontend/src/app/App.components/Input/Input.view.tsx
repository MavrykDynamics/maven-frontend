import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import { InputKind, InputStatusType } from './Input.controller'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import {
  InputComponent,
  InputComponentContainer,
  InputErrorMessage,
  InputIcon,
  InputLabel,
  InputStatus,
  InputStyled,
} from './Input.style'
import Icon from '../Icon/Icon.view'
import { ERROR } from '../Toaster/Toaster.constants'
import { getFullNumber } from '../../../utils/utils'

type InputViewProps = {
  icon?: string
  placeholder: string
  name?: string
  value?: string | number
  convertedValue?: number
  onChange: any
  onBlur: any
  onKeyDown: any
  onWheel: any
  onFocus: any
  inputStatus?: InputStatusType
  type: string
  errorMessage?: string
  disabled?: boolean
  pinnedText?: string
  className?: string
  required?: boolean
  kind?: InputKind
  useMaxHandler?: () => void
  userBalance?: number
}

export const InputView = ({
  icon,
  placeholder,
  name,
  value,
  convertedValue,
  onChange,
  onBlur,
  onKeyDown,
  onFocus,
  inputStatus,
  onWheel,
  type,
  errorMessage,
  disabled,
  pinnedText,
  className,
  kind,
  required,
  useMaxHandler,
  userBalance,
}: InputViewProps) => {
  const isLB = kind === 'LB'
  const status = inputStatus !== undefined ? inputStatus : 'none'
  const classNames = `${kind} ${status} ${isLB ? 'LB' : ''} ${convertedValue === undefined ? 'no-subtext' : ''}`

  return (
    <InputStyled id={'inputStyled'} className={className}>
      {useMaxHandler ? (
        <CustomizedText className="useMax" onClick={useMaxHandler} fontSize={14} fontWidth={600}>
          Use Max
        </CustomizedText>
      ) : null}
      {userBalance !== undefined && pinnedText ? (
        <CustomizedText className="balance" fontSize={14} fontWidth={600}>
          <CommaNumber
            beginningText="Balance:"
            value={userBalance}
            endingText={pinnedText}
            decimalsToShow={pinnedText === 'tzBTC' ? 8 : 6}
          />
        </CustomizedText>
      ) : null}
      {icon && !isLB && (
        <InputIcon>
          <use xlinkHref={`/icons/sprites.svg#${icon}`} />
        </InputIcon>
      )}
      <InputComponentContainer>
        <InputComponent
          id={'inputComponent'}
          type={type}
          name={name}
          required={required}
          className={classNames}
          placeholder={placeholder}
          onWheel={onWheel}
          value={isLB ? getFullNumber(value) : value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          autoComplete={name}
          disabled={disabled}
        />
        <InputStatus className={`${classNames} ${pinnedText ? 'with-text' : ''}`} />
        {pinnedText && !isLB && <InputLabel className={`${classNames} pinned-text`}>{pinnedText}</InputLabel>}

        {isLB && pinnedText && icon ? (
          <div className="LB-coin-info">
            {status === ERROR ? (
              <Icon id="error" className="error-icon" />
            ) : icon.includes('.png') ? (
              <img src={`/images/${icon}`} />
            ) : (
              <svg>
                <use xlinkHref={`/icons/sprites.svg#${icon}`} />
              </svg>
            )}

            {pinnedText && (
              <CustomizedText color="#C0DBFF" fontSize={22} fontWidth={600}>
                {pinnedText}
              </CustomizedText>
            )}
          </div>
        ) : null}

        {isLB && convertedValue !== undefined && (
          <div className="transfer_result">
            <CustomizedText color="#C0DBFF" fontSize={12} fontWidth={500}>
              <CommaNumber beginningText="= $" value={convertedValue ?? 0} decimalsToShow={6} />
            </CustomizedText>
          </div>
        )}
      </InputComponentContainer>
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </InputStyled>
  )
}
