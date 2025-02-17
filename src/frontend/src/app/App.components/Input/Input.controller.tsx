import { InputView } from './Input.view'

export type InputStatusType = 'success' | 'error' | '' | undefined
export type InputKind = 'primary' | 'search' | 'LB'

type InputProps = {
  icon?: string
  placeholder: string
  name?: string
  value?: string | number
  convertedValue?: number
  onChange: any
  onBlur?: any
  onFocus?: any
  onKeyDown?: any
  onWheel?: any
  inputStatus?: InputStatusType
  type: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  pinnedText?: string
  className?: string
  kind?: InputKind
  useMaxHandler?: () => void
  userBalance?: number
}

export const Input = ({
  icon,
  placeholder,
  name,
  value,
  convertedValue,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onWheel,
  inputStatus,
  type,
  errorMessage,
  disabled,
  pinnedText,
  className,
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
      className={className}
      convertedValue={convertedValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
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
